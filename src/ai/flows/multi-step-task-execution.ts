'use server';
/**
 * @fileOverview This file defines the "Planner Agent" for Nexus AI.
 *
 * The flow takes a high-level IT goal as input and uses the Gemini API to generate a sequence of steps required to achieve that goal.
 * It is responsible for creating the initial plan that will be passed to the Executor Agent.
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

// Define the prompt for the Planner Agent
const taskPlanningPrompt = ai.definePrompt({
  name: 'taskPlanningPrompt',
  input: {schema: z.object({
    goal: MultiStepTaskExecutionInputSchema.shape.goal,
    systemContext: z.string().describe('The current state of the relevant IT systems (fetched from Firestore).'),
    availableTools: z.string().describe('A list of available tools/actions the agent can perform (e.g., patch_server, create_jira_ticket, send_slack_alert, reboot_vm).'),
    activeIntegrations: z.string().describe('A list of currently active integrations (e.g., Jira, Slack).'),
  })},
  output: {schema: MultiStepTaskExecutionOutputSchema},
  prompt: `You are the "Planner Agent" in a multi-agent AI system. Your role is to break down a high-level goal into a sequence of actionable steps for the "Executor Agent".

Goal: {{{goal}}}

System Context:
{{{systemContext}}}

Available Tools: {{{availableTools}}}

Active Integrations: {{{activeIntegrations}}}

Instructions:
1.  Break down the goal into a sequence of discrete, actionable steps.
2.  Each step must be a JSON object specifying a human-readable 'description', a machine-readable 'action', and any necessary 'parameters'.
3.  If an integration is active (e.g., Jira), add steps to use it where appropriate (e.g., add a "create_jira_ticket" step to log the work).
4.  If an integration is not active, do not create steps for it.
5.  Your output is a JSON array of these steps, which will be sent to the Executor Agent.

Example Output (with Jira active):
[
  {"description": "Create Jira ticket to track server patching", "action": "create_jira_ticket", "parameters": {"title": "Patch Production Servers"}},
  {"description": "List all production web servers", "action": "list_servers"},
  {"description": "Apply security patch to each server", "action": "apply_patch", "parameters": {"target": "all_web_servers"}},
  {"description": "Verify patch installation", "action": "verify_patch", "parameters": {"target": "all_web_servers"}},
  {"description": "Update Jira ticket with completion status", "action": "update_jira_ticket", "parameters": {"status": "Done"}}
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
            batch.set(docRef, {...system, id: docRef.id});
        });
        await batch.commit();
    }

    const alertsSnapshot = await alertsCollection.limit(1).get();
    if (alertsSnapshot.empty) {
        console.log('Populating initial alerts data...');
        const batch = db.batch();
        initialAlerts.forEach(alert => {
            const docRef = alertsCollection.doc();
            batch.set(docRef, { ...alert, id: docRef.id, timestamp: new Date() });
        });
        await batch.commit();
    }
}


// This is the main flow for the Planner Agent.
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

    const availableTools = ['patch_server', 'create_jira_ticket', 'send_slack_alert', 'reboot_vm', 'list_servers', 'update_jira_ticket'];
    
    // For demo purposes, we'll hardcode the active integrations based on the UI.
    // In a real app, this would be fetched from a configuration store.
    const activeIntegrations = ['Jira', 'Monitoring API'];


    const {output} = await taskPlanningPrompt({
      goal: input.goal,
      systemContext: systemContext,
      availableTools: availableTools.join(', '),
      activeIntegrations: activeIntegrations.join(', '),
    });

    if (!output) {
      throw new Error('Planner Agent failed to generate a task plan.');
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

    // Hand off the plan to the Executor Agent for simulation.
    // We don't wait for it to finish.
    taskExecutionSimulation({ taskId });
  }
);
