'use server';
/**
 * @fileOverview This file defines the "Executor Agent" for Nexus AI.
 *
 * The flow receives a taskId and simulates the execution of the task's steps by updating its status
 * and the status of its steps in Firestore. This represents an agent taking a plan and acting on it.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { getFirebaseAdminApp } from '@/lib/firebase-admin';

// Define the input schema for the simulation flow
const TaskExecutionSimulationInputSchema = z.object({
  taskId: z.string().describe('The ID of the task to execute/simulate.'),
});
export type TaskExecutionSimulationInput = z.infer<typeof TaskExecutionSimulationInputSchema>;

// Exported function to initiate the simulation.
// This is the entry point for the Executor Agent.
export async function taskExecutionSimulation(input: TaskExecutionSimulationInput): Promise<void> {
  // We don't await this so the caller (the Planner Agent) isn't blocked.
  taskExecutionSimulationFlow(input);
}

// Helper function to simulate work/delay.
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// This is the main flow for the Executor Agent.
const taskExecutionSimulationFlow = ai.defineFlow(
  {
    name: 'taskExecutionSimulationFlow',
    inputSchema: TaskExecutionSimulationInputSchema,
    outputSchema: z.void(),
  },
  async ({ taskId }) => {
    getFirebaseAdminApp();
    const db = getFirestore();
    const taskRef = db.collection('tasks').doc(taskId);

    try {
      const taskDoc = await taskRef.get();
      if (!taskDoc.exists) {
        console.error(`Executor Agent: Task ${taskId} not found.`);
        return;
      }
      
      const task = taskDoc.data();
      if (!task) {
        console.error(`Executor Agent: Task data for ${taskId} is empty.`);
        return;
      }

      const steps = task.steps || [];
      const totalSteps = steps.length;
      let completedSteps = 0;

      // Simulate a failure roughly 15% of the time for demonstration.
      const willFail = Math.random() < 0.15;
      const failingStepIndex = willFail ? Math.floor(Math.random() * totalSteps) : -1;

      for (let i = 0; i < totalSteps; i++) {
        // Simulate work being done for a step.
        await sleep(2000 + Math.random() * 3000);

        const currentStep = steps[i];
        let stepStatus: 'completed' | 'failed' = 'completed';
        let logMessage = `Action '${currentStep.action}' executed successfully.`;

        if (i === failingStepIndex) {
          stepStatus = 'failed';
          logMessage = `Error: Action '${currentStep.action}' failed. Could not connect to target system.`;
        } else {
          completedSteps++;
        }
        
        // Update the specific step's status and log in Firestore.
        const stepUpdate: any = {};
        stepUpdate[`steps.${i}.status`] = stepStatus;
        stepUpdate[`steps.${i}.log`] = logMessage;
        await taskRef.update(stepUpdate);

        // Update overall task progress.
        const progress = Math.round((completedSteps / totalSteps) * 100);
        await taskRef.update({ progress });
        
        if (stepStatus === 'failed') {
            await taskRef.update({ status: 'failed', progress: 100 });
            console.log(`Executor Agent: Task ${taskId} failed at step ${i + 1}.`);
            // Execution stops on failure. The Reporter Agent will take over if needed.
            return; 
        }
      }

      // If all steps completed successfully.
      await taskRef.update({ status: 'completed', progress: 100 });
      console.log(`Executor Agent: Task ${taskId} completed successfully.`);

    } catch (error) {
      console.error(`Executor Agent: Error during task simulation for ${taskId}:`, error);
      // Update task to failed state on unexpected error.
      await taskRef.update({ status: 'failed', log: 'Executor Agent failed due to an internal error.' }).catch();
    }
  }
);
