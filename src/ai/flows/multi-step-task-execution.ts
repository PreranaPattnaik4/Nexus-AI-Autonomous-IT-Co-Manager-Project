'use server';
/**
 * @fileOverview This file defines a Genkit flow for breaking down complex IT goals into actionable steps using AI.
 *
 * The flow takes a high-level IT goal as input and uses the Gemini API to generate a sequence of steps required to achieve that goal.
 * It exports the multiStepTaskExecution function, along with its input and output types.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { getFirestore } from 'firebase-admin/firestore';
import { getFirebaseAdminApp } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { taskExecutionSimulation } from './task-execution-simulation';
import { initialAlerts, initialSystems } from '@/lib/data';

// Define the input schema for the multiStepTaskExecution flow
const MultiStepTaskExecutionInputSchema = z.object({
  goal: z.string().describe('The high-level IT goal to achieve (e.g., Ensure all production servers are patched).'),
});
export type MultiStepTaskExecutionInput = z.infer<typeof MultiStepTaskExecutionInputSchema>;

// Define the output schema for the multiStepTaskExecution flow
const MultiStepTaskExecutionOutputSchema = z.object({
  steps: z.array(z.object({
    description: z.string().describe('A human-readable description of the step.'),
    action: z.string().describe('The specific action to take.'),
    parameters: z.record(z.any()).optional().describe('Parameters for the action.'),
  })).describe('A JSON array of sequential steps to achieve the goal.'),
});
export type MultiStepTaskExecutionOutput = z.infer<typeof MultiStepTaskExecutionOutputSchema>;

// Exported function to initiate the multi-step task execution flow
export async function multiStepTaskExecution(input: MultiStepTaskExecutionInput): Promise<void> {
  await multiStepTaskExecutionFlow(input);
}

// Define the prompt for generating the task plan
const taskPlanningPrompt = ai.definePrompt({
  name: 'taskPlanningPrompt',
  input: {schema: z.object({
    goal: MultiStepTaskExecutionInputSchema.shape.goal,
    systemContext: z.string().describe('The current state of the relevant IT systems (fetched from Firestore).'),
    availableTools: z.string().describe('A list of available tools/actions the agent can perform (e.g., patch_server, create_jira_ticket, send_slack_alert, reboot_vm).'),
  })},
  output: {schema: MultiStepTaskExecutionOutputSchema},
  prompt: `You are an AI agent responsible for planning how to achieve complex IT goals. Given a high-level goal, system context, and a set of available tools, your task is to generate a sequence of actionable steps to achieve the goal.

Goal: {{{goal}}}

System Context:
{{{systemContext}}}

Available Tools: {{{availableTools}}}

Instructions:
1.  Break down the goal into a sequence of actionable steps.
2.  Each step should be a JSON object that specifies a human-readable 'description', a machine-readable 'action' and any necessary 'parameters'.
3.  Output a JSON array of sequential steps.

Example Output:
[
  {"description": "List all production web servers", "action": "list_servers"},
  {"description": "Apply security patch to each server", "action": "apply_patch", "parameters": {"target": "all_web_servers"}},
  {"description": "Verify patch installation", "action": "verify_patch", "parameters": {"target": "all_web_servers"}}
]

Your Task: Generate the JSON array of steps required to achieve the goal.`, 
});

async function maybePopulateInitialData(db: FirebaseFirestore.Firestore) {
    const systemsCollection = db.collection('systems');
    const alertsCollection = db.collection('alerts');

    const systemsSnapshot = await systemsCollection.limit(1).get();
    if (systemsSnapshot.empty) {
        console.log('Populating initial systems data...');
        const batch = db.batch();
        initialSystems.forEach(system => {
            const docRef = systemsCollection.doc();
            batch.set(docRef, system);
        });
        await batch.commit();
    }

    const alertsSnapshot = await alertsCollection.limit(1).get();
    if (alertsSnapshot.empty) {
        console.log('Populating initial alerts data...');
        const batch = db.batch();
        initialAlerts.forEach(alert => {
            const docRef = alertsCollection.doc();
            batch.set(docRef, { ...alert, timestamp: new Date() });
        });
        await batch.commit();
    }
}


// Define the Genkit flow for multi-step task execution
const multiStepTaskExecutionFlow = ai.defineFlow(
  {
    name: 'multiStepTaskExecutionFlow',
    inputSchema: MultiStepTaskExecutionInputSchema,
    outputSchema: z.void(),
  },
  async (input) => {
    getFirebaseAdminApp();
    const db = getFirestore();

    await maybePopulateInitialData(db);

    const systemsSnapshot = await db.collection('systems').get();
    const systems = systemsSnapshot.docs.map(doc => doc.data());
    const systemContext = JSON.stringify(systems, null, 2);

    const availableTools = ['patch_server', 'create_jira_ticket', 'send_slack_alert', 'reboot_vm', 'list_servers'];

    const {output} = await taskPlanningPrompt({
      goal: input.goal,
      systemContext: systemContext,
      availableTools: availableTools.join(', '),
    });

    if (!output) {
      throw new Error('Failed to generate task plan.');
    }

    const taskId = db.collection('tasks').doc().id;
    
    const newTask = {
      id: taskId,
      goal: input.goal,
      status: 'in-progress',
      progress: 0,
      steps: output.steps.map(step => ({ ...step, status: 'pending', log: '' })),
      createdAt: FieldValue.serverTimestamp(),
    };

    await db.collection('tasks').doc(taskId).set(newTask);

    // Don't wait for the simulation to finish
    taskExecutionSimulation({ taskId });
  }
);
