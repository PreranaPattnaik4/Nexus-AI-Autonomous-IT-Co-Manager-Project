'use server';

import { revalidatePath } from 'next/cache';
import { multiStepTaskExecution } from '@/ai/flows/multi-step-task-execution';
import { generateRcaReport as generateRcaReportFlow } from '@/ai/flows/rca-report-generation';
import { proactiveIssueResolution } from '@/ai/flows/proactive-issue-resolution';
import { getFirestore } from 'firebase-admin/firestore';
import { getFirebaseAdminApp } from '@/lib/firebase-admin';

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
        .join('\n');

    return `Task ID: ${taskId}\nGoal: ${task?.goal}\n\n${logs}`;
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
    await multiStepTaskExecution({ goal });
    console.log('AI flow `multiStepTaskExecution` invoked.');

    revalidatePath('/');
    return { message: 'Successfully created task.' };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return {
      message: `Failed to create task: ${errorMessage}`,
      errors: {},
    };
  }
}

export async function generateRcaReport(taskId: string): Promise<string> {
    try {
        const taskLogs = await getTaskLogs(taskId);
        const { report } = await generateRcaReportFlow({ taskLogs });
        return report;
    } catch (error) {
        console.error('Error generating RCA report:', error);
        return 'Failed to generate RCA report. Please check the logs.';
    }
}


export async function resolveAlert(alertTitle: string) {
    try {
        const { goal } = await proactiveIssueResolution({
            issueDescription: alertTitle,
            systemContext: { 'detail': 'Mock system context for alert resolution' }
        });
        
        console.log(`Generated resolution goal: ${goal}`);
        
        await multiStepTaskExecution({ goal });

        revalidatePath('/');

        return { success: true, message: `New task created to resolve: ${alertTitle}` };

    } catch(error) {
        console.error('Error resolving alert:', error);
        return { success: false, message: 'Failed to initiate resolution.' };
    }
}
