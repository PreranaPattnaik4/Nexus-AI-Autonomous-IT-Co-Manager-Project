'use server';
/**
 * @fileOverview Implements the Goal-Based Task Management flow. It allows IT managers
 * to submit IT management goals in natural language, which are then translated into
 * actionable steps.
 *
 * @fileOverview
 * - goalBasedTaskManagement - A function that handles the goal-based task management process.
 * - GoalBasedTaskManagementInput - The input type for the goalBasedTaskManagement function.
 * - GoalBasedTaskManagementOutput - The return type for the goalBasedTaskManagement function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GoalBasedTaskManagementInputSchema = z.object({
  goal: z
    .string()
    .describe(
      'The IT management goal described in natural language, e.g., \'Ensure all production servers are patched\'.' // Ensure all production servers are patched
    ),
  system_context: z.record(z.any()).describe('The current state of the relevant IT systems.'),
});
export type GoalBasedTaskManagementInput = z.infer<
  typeof GoalBasedTaskManagementInputSchema
>;

const GoalBasedTaskManagementOutputSchema = z.object({
  steps: z
    .array(z.record(z.string(), z.any()))
    .describe(
      'A JSON array of sequential steps to achieve the goal, e.g., [{\'action\': \'list_servers\'}, {\'action\': \'apply_patch\', \'target\': \'server_id\'}]'
    ),
});
export type GoalBasedTaskManagementOutput = z.infer<
  typeof GoalBasedTaskManagementOutputSchema
>;

export async function goalBasedTaskManagement(
  input: GoalBasedTaskManagementInput
): Promise<GoalBasedTaskManagementOutput> {
  return goalBasedTaskManagementFlow(input);
}

const prompt = ai.definePrompt({
  name: 'goalBasedTaskManagementPrompt',
  input: {schema: GoalBasedTaskManagementInputSchema},
  output: {schema: GoalBasedTaskManagementOutputSchema},
  prompt: `You are an AI IT management assistant. Your job is to translate a high-level IT goal into a series of actionable steps.

  The goal is: {{{goal}}}

  Here is the current state of the IT systems: {{{system_context}}}

  Available tools/actions the agent can perform: patch_server, create_jira_ticket, send_slack_alert, reboot_vm, list_servers

  Instructions: Output a JSON array of sequential steps. Each step should include an "action" field and any parameters required for that action. Return only valid JSON.

  Example Output: [{\"action\": \"list_servers\"}, {\"action\": \"apply_patch\", \"target\": \"server_id\"}]`,
});

const goalBasedTaskManagementFlow = ai.defineFlow(
  {
    name: 'goalBasedTaskManagementFlow',
    inputSchema: GoalBasedTaskManagementInputSchema,
    outputSchema: GoalBasedTaskManagementOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
