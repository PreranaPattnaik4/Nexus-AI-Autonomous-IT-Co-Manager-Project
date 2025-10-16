'use server';
/**
 * @fileOverview This file defines the "Reporter Agent" for Nexus AI.
 *
 * Its responsibility is to analyze the logs of a completed or failed task and generate a
 * human-readable Root Cause Analysis (RCA) report.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRcaReportInputSchema = z.object({
  taskLogs: z
    .string()
    .describe('The execution logs of the task that need to be analyzed.'),
});
export type GenerateRcaReportInput = z.infer<typeof GenerateRcaReportInputSchema>;

const GenerateRcaReportOutputSchema = z.object({
  report: z.string().describe('A human-readable report explaining the root cause of issues and how they were resolved.'),
});
export type GenerateRcaReportOutput = z.infer<typeof GenerateRcaReportOutputSchema>;

// The entry point for the Reporter Agent.
export async function generateRcaReport(input: GenerateRcaReportInput): Promise<GenerateRcaReportOutput> {
  return generateRcaReportFlow(input);
}

// The prompt that drives the Reporter Agent's analysis.
const prompt = ai.definePrompt({
  name: 'generateRcaReportPrompt',
  input: {schema: GenerateRcaReportInputSchema},
  output: {schema: GenerateRcaReportOutputSchema},
  prompt: `You are the "Reporter Agent" in a multi-agent AI system. Your role is to perform root cause analysis on completed or failed tasks.

You will analyze the provided task execution logs and generate a detailed, human-readable report in Markdown format. The report should explain the initial goal, the steps taken, the outcome (success or failure), and the final resolution.

Task Logs:
{{{taskLogs}}}
`,
});

// The main flow for the Reporter Agent.
const generateRcaReportFlow = ai.defineFlow(
  {
    name: 'generateRcaReportFlow',
    inputSchema: GenerateRcaReportInputSchema,
    outputSchema: GenerateRcaReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
