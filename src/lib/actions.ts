'use server';

import { revalidatePath } from 'next/cache';
import { multiStepTaskExecution } from '@/ai/flows/multi-step-task-execution';
import { generateRcaReport as generateRcaReportFlow } from '@/ai/flows/rca-report-generation';
import { proactiveIssueResolution } from '@/ai/flows/proactive-issue-resolution';

export interface GoalFormState {
  message: string;
  errors?: {
    goal?: string[];
  };
}

// Simulate a database call to get a task
const getTaskLogs = async (taskId: string) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return `Task ID: ${taskId}
Log 1: Server discovery initiated. Found 10 servers.
Log 2: Patching server-01... Success.
Log 3: Patching server-02... Success.
Log 4: Patching server-03... Failed. Connection timeout.
Log 5: Retrying patch on server-03... Success.
Log 6: All servers patched. Verification complete.`;
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
    // This is a mock AI call. In a real app, you'd use the Genkit flow.
    const response = await multiStepTaskExecution({
      goal,
      systemContext: { 'info': 'mock system context' },
      availableTools: ['patch_server', 'create_jira_ticket', 'send_slack_alert', 'reboot_vm'],
    });

    console.log('AI Response:', response);

    // Here you would save the new task to your database.
    // For this demo, we just log it and revalidate the path.
    await new Promise(resolve => setTimeout(resolve, 1000));

    revalidatePath('/');
    return { message: 'Successfully created task.' };
  } catch (error) {
    console.error(error);
    return {
      message: 'An unexpected error occurred.',
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
        
        // Simulate creating a new task from this goal
        await new Promise(resolve => setTimeout(resolve, 1000));

        revalidatePath('/');

        return { success: true, message: `New task created to resolve: ${alertTitle}` };

    } catch(error) {
        console.error('Error resolving alert:', error);
        return { success: false, message: 'Failed to initiate resolution.' };
    }
}
