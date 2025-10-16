'use server';
/**
 * @fileOverview This file defines a flow for simulating IT command execution.
 * The AI assistant receives a command and returns a realistic, simulated output
 * as if it were running in a real terminal.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Define the input schema for the command simulation flow
const CommandSimulationInputSchema = z.object({
  command: z.string().describe('The command entered by the user, e.g., "ls -la /etc/nginx"'),
});
export type CommandSimulationInput = z.infer<typeof CommandSimulationInputSchema>;

// Define the output schema for the command simulation flow
const CommandSimulationOutputSchema = z.object({
  output: z.string().describe('The simulated terminal output for the given command. Should be formatted inside a markdown code block.'),
});
export type CommandSimulationOutput = z.infer<typeof CommandSimulationOutputSchema>;

// Exported function to be called from the server action
export async function commandSimulation(input: CommandSimulationInput): Promise<CommandSimulationOutput> {
  return commandSimulationFlow(input);
}

// Define the prompt for the command simulation
const commandSimulationPrompt = ai.definePrompt({
  name: 'commandSimulationPrompt',
  input: { schema: CommandSimulationInputSchema },
  output: { schema: CommandSimulationOutputSchema },
  prompt: `You are an expert IT command-line assistant. Your job is to simulate the output of shell commands.
The user will provide a command, and you must return a realistic-looking, simulated output for that command.

The output should be formatted as if it's appearing in a real terminal. For file listings, include permissions, owners, and dates. For network commands, show sample IP addresses and statuses.
Enclose the entire simulated output in a Markdown code block with the 'shell' language tag.

User Command: {{{command}}}

Example for 'ls -la /var/log':
\`\`\`shell
total 24
drwxr-xr-x 1 root root  4096 Jul 21 10:00 .
drwxr-xr-x 1 root root  4096 Jul 20 08:30 ..
-rw-r--r-- 1 root root 12345 Jul 21 09:55 syslog
-rw-r--r-- 1 root root  5432 Jul 21 09:50 auth.log
\`\`\`

Example for 'kubectl get pods -n prod':
\`\`\`shell
NAME READY STATUS  RESTARTS AGE
webapp-deploy-a8d9bcfd9-2v3x4   1/1   Running   0   2d4h
api-gateway-b4a89dfc9-p5m6q     1/1   Running   0   1d2h
redis-master-0                  1/1   Running   0   5d1h
\`\`\`
`,
});

// Define the main Genkit flow for command simulation
const commandSimulationFlow = ai.defineFlow(
  {
    name: 'commandSimulationFlow',
    inputSchema: CommandSimulationInputSchema,
    outputSchema: CommandSimulationOutputSchema,
  },
  async (input) => {
    const { output } = await commandSimulationPrompt(input);
    if (!output) {
      return { output: "```shell\nError: Command simulation failed. Please try again.\n```" };
    }
    return output;
  }
);
