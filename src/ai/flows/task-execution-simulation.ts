'use server';
/**
 * @fileOverview This file defines a Genkit flow for simulating the execution of a multi-step task.
 *
 * The flow receives a taskId and simulates the progress of the task by updating its status
 * and the status of its steps in Firestore.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { getFirebaseAdminApp } from '@/lib/firebase-admin';

// Define the input schema for the simulation flow
const TaskExecutionSimulationInputSchema = z.object({
  taskId: z.string().describe('The ID of the task to simulate.'),
});
export type TaskExecutionSimulationInput = z.infer<typeof TaskExecutionSimulationInputSchema>;

// Exported function to initiate the simulation
export async function taskExecutionSimulation(input: TaskExecutionSimulationInput): Promise<void> {
  // We don't await this so the caller isn't blocked
  taskExecutionSimulationFlow(input);
}

// Helper function to delay execution
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

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
        console.error(`Task ${taskId} not found for simulation.`);
        return;
      }
      
      const task = taskDoc.data();
      if (!task) {
        console.error(`Task data for ${taskId} is empty.`);
        return;
      }

      const steps = task.steps || [];
      const totalSteps = steps.length;
      let completedSteps = 0;

      // Simulate a failure roughly 15% of the time for demonstration
      const willFail = Math.random() < 0.15;
      const failingStepIndex = willFail ? Math.floor(Math.random() * totalSteps) : -1;

      for (let i = 0; i < totalSteps; i++) {
        // Simulate work being done for a step
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
        
        // Update the specific step's status and log
        const stepUpdate: any = {};
        stepUpdate[`steps.${i}.status`] = stepStatus;
        stepUpdate[`steps.${i}.log`] = logMessage;
        await taskRef.update(stepUpdate);

        // Update overall task progress
        const progress = Math.round((completedSteps / totalSteps) * 100);
        await taskRef.update({ progress });
        
        if (stepStatus === 'failed') {
            await taskRef.update({ status: 'failed', progress: 100 });
            console.log(`Task ${taskId} failed at step ${i + 1}.`);
            return; // Stop simulation on failure
        }
      }

      // If all steps completed successfully
      await taskRef.update({ status: 'completed', progress: 100 });
      console.log(`Task ${taskId} completed successfully.`);

    } catch (error) {
      console.error(`Error during task simulation for ${taskId}:`, error);
      await taskRef.update({ status: 'failed', log: 'Simulation failed due to an internal error.' }).catch();
    }
  }
);
