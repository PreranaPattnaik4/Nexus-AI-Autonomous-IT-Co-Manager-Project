'use server';
/**
 * @fileOverview A conversational RCA agent that can answer questions about past incidents.
 * This file implements a Retrieval-Augmented Generation (RAG) flow.
 *
 * - conversationalRca - A function that handles the conversational RCA process.
 * - ConversationalRcaInput - The input type for the conversationalRca function.
 * - ConversationalRcaOutput - The return type for the conversationalRca function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { getFirestore } from 'firebase-admin/firestore';
import { getFirebaseAdminApp } from '@/lib/firebase-admin';
import { Document } from 'langchain/document';

// Define the input schema for the main flow
const ConversationalRcaInputSchema = z.object({
  query: z.string().describe('The user\'s question about past incidents or RCA reports.'),
});
export type ConversationalRcaInput = z.infer<typeof ConversationalRcaInputSchema>;

// Define the output schema for the main flow
const ConversationalRcaOutputSchema = z.object({
  answer: z.string().describe('The AI-generated answer to the user\'s query.'),
});
export type ConversationalRcaOutput = z.infer<typeof ConversationalRcaOutputSchema>;

// The main exported function that will be called from the server action
export async function conversationalRca(input: ConversationalRcaInput): Promise<ConversationalRcaOutput> {
  return conversationalRcaFlow(input);
}

/**
 * A tool that searches Firestore for RCA reports that are relevant to the user's query.
 */
const searchRcaReportsTool = ai.defineTool(
  {
    name: 'searchRcaReports',
    description: 'Searches for and retrieves Root Cause Analysis (RCA) reports based on a user query.',
    inputSchema: z.object({
      query: z.string().describe('Keywords or questions related to the incident or task.'),
    }),
    outputSchema: z.array(
      z.object({
        id: z.string(),
        taskId: z.string(),
        report: z.string(),
        generatedAt: z.string(),
      })
    ),
  },
  async (input) => {
    console.log(`Searching RCA reports with query: ${input.query}`);
    getFirebaseAdminApp();
    const db = getFirestore();
    const reportsSnapshot = await db.collection('reports').get();
    const reports = reportsSnapshot.docs.map(doc => doc.data() as any);

    // Simple keyword matching for demonstration.
    // A real-world app would use a more sophisticated search/embedding strategy.
    const keywords = input.query.toLowerCase().split(' ');
    const relevantReports = reports.filter(report => {
      const reportText = (report.report || '').toLowerCase();
      const taskId = (report.taskId || '').toLowerCase();
      return keywords.some(keyword => reportText.includes(keyword) || taskId.includes(keyword));
    });
    
    console.log(`Found ${relevantReports.length} relevant reports.`);
    return relevantReports.map(r => ({...r, generatedAt: r.generatedAt.toDate().toISOString()}));
  }
);

// Define the prompt that uses the tool
const conversationalRcaPrompt = ai.definePrompt({
  name: 'conversationalRcaPrompt',
  input: { schema: ConversationalRcaInputSchema },
  output: { schema: ConversationalRcaOutputSchema },
  tools: [searchRcaReportsTool],
  prompt: `You are an expert IT analyst and co-pilot named Nexus AI. Your job is to answer questions based on the provided Root Cause Analysis (RCA) reports.

  User Query: {{{query}}}
  
  Instructions:
  1. Use the 'searchRcaReportsTool' to find relevant reports.
  2. If no relevant reports are found, inform the user that you couldn't find any information matching their query.
  3. If reports are found, synthesize the information from them to provide a concise, helpful, and human-readable answer to the user's query.
  4. Do not just repeat the report content. Explain the findings in your own words. Be friendly and conversational.`,
});

// Define the main Genkit flow
const conversationalRcaFlow = ai.defineFlow(
  {
    name: 'conversationalRcaFlow',
    inputSchema: ConversationalRcaInputSchema,
    outputSchema: ConversationalRcaOutputSchema,
  },
  async (input) => {
    const { output } = await conversationalRcaPrompt(input);
    if (!output) {
      return { answer: "I'm sorry, I wasn't able to process that request. Please try again." };
    }
    return output;
  }
);
