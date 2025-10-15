'use server';
/**
 * @fileOverview RCA Report Generation AI agent.
 *
 * - generateRcaReport - A function that handles the RCA report generation process.
 * - GenerateRcaReportInput - The input type for the generateRcaReport function.
 * - GenerateRcaReportOutput - The return type for the generateRcaReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRcaReportInputSchema = z.object({
  taskLogs: z
    .string()
    .describe('The logs of the completed task that need to be analyzed.'),
});
export type GenerateRcaReportInput = z.infer<typeof GenerateRcaReportInputSchema>;

const GenerateRcaReportOutputSchema = z.object({
  report: z.string().describe('A human-readable report explaining the root cause of issues and how they were resolved.'),
});
export type GenerateRcaReportOutput = z.infer<typeof GenerateRcaReportOutputSchema>;

export async function generateRcaReport(input: GenerateRcaReportInput): Promise<GenerateRcaReportOutput> {
  return generateRcaReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRcaReportPrompt',
  input: {schema: GenerateRcaReportInputSchema},
  output: {schema: GenerateRcaReportOutputSchema},
  prompt: `You are an expert IT analyst specializing in root cause analysis.

You will analyze the provided task logs and generate a detailed, human-readable report explaining the issue, the steps taken, and the final resolution.

Task Logs:
{{{taskLogs}}}
`,
});

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
