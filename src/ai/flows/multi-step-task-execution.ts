'use server';
/**
 * @fileOverview This file defines a Genkit flow for breaking down complex IT goals into actionable steps using AI.
 *
 * The flow takes a high-level IT goal as input and uses the Gemini API to generate a sequence of steps required to achieve that goal.
 * It exports the multiStepTaskExecution function, along with its input and output types.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema for the multiStepTaskExecution flow
const MultiStepTaskExecutionInputSchema = z.object({
  goal: z.string().describe('The high-level IT goal to achieve (e.g., Ensure all production servers are patched).'),
  systemContext: z.record(z.any()).describe('The current state of the relevant IT systems (fetched from Firestore).'),
  availableTools: z.array(z.string()).describe('A list of available tools/actions the agent can perform (e.g., patch_server, create_jira_ticket, send_slack_alert, reboot_vm).'),
});
export type MultiStepTaskExecutionInput = z.infer<typeof MultiStepTaskExecutionInputSchema>;

// Define the output schema for the multiStepTaskExecution flow
const MultiStepTaskExecutionOutputSchema = z.object({
  steps: z.array(z.record(z.any())).describe('A JSON array of sequential steps to achieve the goal.'),
});
export type MultiStepTaskExecutionOutput = z.infer<typeof MultiStepTaskExecutionOutputSchema>;

// Exported function to initiate the multi-step task execution flow
export async function multiStepTaskExecution(input: MultiStepTaskExecutionInput): Promise<MultiStepTaskExecutionOutput> {
  return multiStepTaskExecutionFlow(input);
}

// Define the prompt for generating the task plan
const taskPlanningPrompt = ai.definePrompt({
  name: 'taskPlanningPrompt',
  input: {schema: MultiStepTaskExecutionInputSchema},
  output: {schema: MultiStepTaskExecutionOutputSchema},
  prompt: `You are an AI agent responsible for planning how to achieve complex IT goals. Given a high-level goal, system context, and a set of available tools, your task is to generate a sequence of actionable steps to achieve the goal.

Goal: {{{goal}}}

System Context: {{{systemContext}}}

Available Tools: {{#each availableTools}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Instructions:
1.  Break down the goal into a sequence of actionable steps.
2.  Each step should be a JSON object that specifies an action to perform and any necessary parameters.
3.  Output a JSON array of sequential steps.

Example Output:
[
  {"action": "list_servers"},
  {"action": "apply_patch", "target": "server_id"},
  {"action": "verify_patch"}
]

Your Task: Generate the JSON array of steps required to achieve the goal.`, // Ensure output is valid JSON
});

// Define the Genkit flow for multi-step task execution
const multiStepTaskExecutionFlow = ai.defineFlow(
  {
    name: 'multiStepTaskExecutionFlow',
    inputSchema: MultiStepTaskExecutionInputSchema,
    outputSchema: MultiStepTaskExecutionOutputSchema,
  },
  async input => {
    const {output} = await taskPlanningPrompt(input);
    return output!;
  }
);
