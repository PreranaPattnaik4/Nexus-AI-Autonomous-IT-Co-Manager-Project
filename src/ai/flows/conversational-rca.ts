'use server';
/**
 * @fileOverview A conversational AI assistant that can answer questions about system health, tasks, alerts, and RCA reports.
 * This file implements a Retrieval-Augmented Generation (RAG) flow using multiple tools.
 *
 * - conversationalRca - A function that handles the conversational process.
 * - ConversationalRcaInput - The input type for the conversationalRca function.
 * - ConversationalRcaOutput - The return type for the conversationalRca function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { getFirestore } from 'firebase-admin/firestore';
import { getFirebaseAdminApp } from '@/lib/firebase-admin';

// Define the input schema for the main flow
const ConversationalRcaInputSchema = z.object({
  query: z.string().describe('The user\'s question about past incidents, tasks, system status, or RCA reports.'),
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
 * A tool that searches Firestore for RCA reports.
 */
const searchRcaReportsTool = ai.defineTool(
  {
    name: 'searchRcaReports',
    description: 'Searches for and retrieves Root Cause Analysis (RCA) reports based on a user query about a specific incident or task ID.',
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

/**
 * A tool that fetches current system status from Firestore.
 */
const getSystemHealthTool = ai.defineTool(
    {
        name: 'getSystemHealth',
        description: 'Retrieves the current status and metrics (CPU, Memory) of all monitored IT systems.',
        inputSchema: z.object({}),
        outputSchema: z.array(z.object({
            id: z.string(),
            name: z.string(),
            status: z.string(),
            cpuUsage: z.number(),
            memoryUsage: z.number(),
        })),
    },
    async () => {
        console.log('Fetching system health data...');
        getFirebaseAdminApp();
        const db = getFirestore();
        const systemsSnapshot = await db.collection('systems').get();
        const systems = systemsSnapshot.docs.map(doc => doc.data() as any);
        console.log(`Found ${systems.length} systems.`);
        return systems;
    }
);

/**
 * A tool that fetches current tasks from Firestore.
 */
const getTasksTool = ai.defineTool(
    {
        name: 'getTasks',
        description: 'Retrieves a list of tasks, optionally filtering by status (in-progress, completed, failed).',
        inputSchema: z.object({
            status: z.enum(["in-progress", "completed", "failed"]).optional().describe('The status to filter tasks by.'),
        }),
        outputSchema: z.array(z.object({
            id: z.string(),
            goal: z.string(),
            status: z.string(),
            progress: z.number(),
        })),
    },
    async (input) => {
        console.log(`Fetching tasks with status: ${input.status || 'all'}`);
        getFirebaseAdminApp();
        const db = getFirestore();
        let tasksQuery: any = db.collection('tasks');
        if (input.status) {
            tasksQuery = tasksQuery.where('status', '==', input.status);
        }
        const tasksSnapshot = await tasksQuery.get();
        const tasks = tasksSnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: data.id,
                goal: data.goal,
                status: data.status,
                progress: data.progress,
            };
        });
        console.log(`Found ${tasks.length} tasks.`);
        return tasks;
    }
);


// Define the prompt that uses the new tools
const conversationalRcaPrompt = ai.definePrompt({
  name: 'conversationalRcaPrompt',
  input: { schema: ConversationalRcaInputSchema },
  output: { schema: ConversationalRcaOutputSchema },
  tools: [searchRcaReportsTool, getSystemHealthTool, getTasksTool],
  prompt: `You are Nexus AI, an expert IT co-pilot. Your job is to answer questions based on real-time data from the IT environment.

  User Query: {{{query}}}
  
  Instructions:
  1.  Analyze the user's query to understand their intent.
  2.  Based on the intent, choose the appropriate tool:
      - For questions about past incidents or specific RCA reports, use 'searchRcaReportsTool'.
      - For questions about the current status of servers, CPU, or memory, use 'getSystemHealthTool'.
      - For questions about ongoing, completed, or failed tasks, use 'getTasksTool'.
  3.  If no specific tool seems relevant, provide a helpful, general response.
  4.  If a tool returns no data, inform the user that you couldn't find any information matching their query.
  5.  If a tool returns data, synthesize the information to provide a concise, helpful, and human-readable answer. Do not just repeat the raw data.
  6.  Be friendly, conversational, and act as an intelligent assistant.`,
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
