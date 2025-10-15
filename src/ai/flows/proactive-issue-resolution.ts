'use server';
/**
 * @fileOverview A proactive issue resolution AI agent.
 *
 * - proactiveIssueResolution - A function that handles the proactive issue resolution process.
 * - ProactiveIssueResolutionInput - The input type for the proactiveIssueResolution function.
 * - ProactiveIssueResolutionOutput - The return type for the proactiveIssueResolution function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProactiveIssueResolutionInputSchema = z.object({
  issueDescription: z.string().describe('The description of the issue.'),
  systemContext: z.record(z.any()).describe('The current state of the relevant IT systems.'),
});
export type ProactiveIssueResolutionInput = z.infer<
  typeof ProactiveIssueResolutionInputSchema
>;

const ProactiveIssueResolutionOutputSchema = z.object({
  goal: z.string().describe('The generated goal to resolve the issue.'),
});
export type ProactiveIssueResolutionOutput = z.infer<
  typeof ProactiveIssueResolutionOutputSchema
>;

export async function proactiveIssueResolution(
  input: ProactiveIssueResolutionInput
): Promise<ProactiveIssueResolutionOutput> {
  return proactiveIssueResolutionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'proactiveIssueResolutionPrompt',
  input: {schema: ProactiveIssueResolutionInputSchema},
  output: {schema: ProactiveIssueResolutionOutputSchema},
  prompt: `You are an expert IT manager specializing in resolving IT issues proactively.\n\nYou will use the issue description and the current state of the IT systems to generate a goal to resolve the issue.\n\nIssue Description: {{{issueDescription}}}\nSystem Context: {{{systemContext}}}\n\nGenerate a clear and concise goal that can be used to resolve the issue.`,
});

const proactiveIssueResolutionFlow = ai.defineFlow(
  {
    name: 'proactiveIssueResolutionFlow',
    inputSchema: ProactiveIssueResolutionInputSchema,
    outputSchema: ProactiveIssueResolutionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
