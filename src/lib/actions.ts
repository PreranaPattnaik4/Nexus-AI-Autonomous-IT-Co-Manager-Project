'use server';

import { revalidatePath } from 'next/cache';
import { multiStepTaskExecution } from '@/ai/flows/multi-step-task-execution';
import { generateRcaReport as generateRcaReportFlow } from '@/ai/flows/rca-report-generation';
import { proactiveIssueResolution } from '@/ai/flows/proactive-issue-resolution';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { getFirebaseAdminApp } from '@/lib/firebase-admin';
import { marked } from 'marked';
import { Step, ChatMessage } from './firestore-types';
import { nanoid } from 'nanoid';
import { conversationalRca } from '@/ai/flows/conversational-rca';

export interface GoalFormState {
  message: string;
  errors?: {
    goal?: string[];
  };
}

// Simulate a database call to get a task
const getTaskLogs = async (taskId: string): Promise<string> => {
    getFirebaseAdminApp();
    const db = getFirestore();
    const taskDoc = await db.collection('tasks').doc(taskId).get();
    if (!taskDoc.exists) {
        return `No task found with ID: ${taskId}`;
    }
    const task = taskDoc.data();
    const logs = task?.steps
        .map((step: any, index: number) => `Step ${index + 1} (${step.status}): ${step.description}\nLog: ${step.log || 'No log available'}`)
        .join('\n\n');

    return `## Task Analysis for ID: ${taskId}\n**Goal:** ${task?.goal}\n\n**Execution Log:**\n\n---\n\n${logs}`;
};


export async function submitGoal(
  prevState: GoalFormState,
  formData: FormData
): Promise<GoalFormState> {
  const goal = formData.get('goal') as string;

  if (!goal || goal.trim().length < 10) {
    return {
      message: 'Failed to create task.',
      errors: {
        goal: ['Goal must be at least 10 characters long.'],
      },
    };
  }

  try {
    // This flow is non-blocking, it kicks off the simulation
    await multiStepTaskExecution({ goal });
    console.log('AI flow `multiStepTaskExecution` invoked.');

    revalidatePath('/'); // Revalidates the page to show the new task
    return { message: 'Successfully created task. Agent is starting execution...' };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return {
      message: `Failed to create task: ${errorMessage}`,
      errors: {},
    };
  }
}

async function saveReportToFirestore(taskId: string, reportContent: string): Promise<string> {
    getFirebaseAdminApp();
    const db = getFirestore();
    const reportRef = db.collection('reports').doc();
    
    const newReport = {
        id: reportRef.id,
        taskId: taskId,
        report: reportContent,
        generatedAt: Timestamp.now(),
    };

    await reportRef.set(newReport);
    return reportRef.id;
}


export async function generateRcaReport(taskId: string): Promise<string> {
    try {
        const taskLogs = await getTaskLogs(taskId);
        const { report } = await generateRcaReportFlow({ taskLogs });
        
        const htmlReport = await marked(report);
        
        await saveReportToFirestore(taskId, htmlReport);
        revalidatePath('/reports');

        return htmlReport;
    } catch (error) {
        console.error('Error generating RCA report:', error);
        return '<p>Failed to generate RCA report. Please check the server logs.</p>';
    }
}


export async function resolveAlert(alertTitle: string) {
    try {
        const { goal } = await proactiveIssueResolution({
            issueDescription: alertTitle,
            systemContext: { 'detail': 'Mock system context for alert resolution' }
        });
        
        console.log(`Generated resolution goal: ${goal}`);
        
        // Don't wait for this to finish, let it run in the background
        multiStepTaskExecution({ goal });

        revalidatePath('/');

        return { success: true, message: `New task created to resolve: ${alertTitle}` };

    } catch(error) {
        console.error('Error resolving alert:', error);
        return { success: false, message: 'Failed to initiate resolution.' };
    }
}

export async function retryTask(taskId: string, originalGoal: string) {
    try {
        getFirebaseAdminApp();
        const db = getFirestore();
        const taskRef = db.collection('tasks').doc(taskId);
        const taskDoc = await taskRef.get();

        if (!taskDoc.exists) {
            return { success: false, message: 'Task not found.' };
        }

        const taskData = taskDoc.data();
        if (!taskData) {
            return { success: false, message: 'Task data is empty.' };
        }
        
        const failureLogs = taskData.steps
            .filter((step: Step) => step.status === 'failed')
            .map((step: Step) => `Step "${step.description}" failed with log: ${step.log}`)
            .join('\n');
        
        // This is the "Gemini Thought Trace"
        const reasonedGoal = `[Self-Correction] The goal "${originalGoal}" failed. My analysis shows: ${failureLogs || 'No specific failure logs were found.'} I will now create a new plan to achieve the original goal, accounting for this failure.`;
        
        // This flow is non-blocking, it kicks off the simulation
        await multiStepTaskExecution({ goal: reasonedGoal });

        // Update the old task to show it has been superseded.
        await taskRef.update({ 
            status: 'superseded',
        });
        
        revalidatePath('/');
        return { success: true, message: `AI is analyzing the failure and creating a new execution plan.` };

    } catch (error) {
        console.error(`Error retrying task ${taskId}:`, error);
        return { success: false, message: 'Failed to initiate AI self-healing.' };
    }
}

export async function submitChatMessage(
  prevState: ChatMessage | null,
  formData: FormData,
): Promise<ChatMessage | null> {
    const messageContent = formData.get('message') as string;

    if (!messageContent) {
        return null;
    }

    const userMessage: ChatMessage = {
        id: nanoid(),
        role: 'user',
        content: messageContent,
        createdAt: new Date(),
    };

    // For now, we are not saving the chat history to keep the demo simple.
    // In a real app, you would save userMessage to Firestore here.

    try {
        const { answer } = await conversationalRca({ query: messageContent });

        const aiMessage: ChatMessage = {
            id: nanoid(),
            role: 'model',
            content: answer,
            createdAt: new Date(),
        };
        // You would also save aiMessage to Firestore here.
        return aiMessage;

    } catch (error) {
        console.error("Error in conversational RCA flow:", error);
        const errorMessage: ChatMessage = {
            id: nanoid(),
            role: 'model',
            content: "I'm sorry, something went wrong while I was thinking. Please try again.",
            createdAt: new Date(),
        };
        return errorMessage;
    }
}
