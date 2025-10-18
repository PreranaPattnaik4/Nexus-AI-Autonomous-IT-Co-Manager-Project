'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Lightbulb, BookOpen, CircleHelp } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const examplePrompts = [
    "Ensure all production servers are patched to the latest security standards.",
    "Onboard a new developer to the 'project-x' repository by granting access and sending a welcome email.",
    "Diagnose and resolve the high CPU usage on the cache server.",
    "Reboot the staging database server and notify the team on Slack.",
    "Run a full system backup and verify the integrity of the backup file.",
    "Deploy the latest version of the web application to the staging environment."
];

export default function HelpPage() {
  return (
    <div className="space-y-6">
       <Card>
        <CardHeader>
            <div className="flex items-center gap-2">
                <CircleHelp className="h-5 w-5" />
                <CardTitle>Help & Support</CardTitle>
            </div>
            <CardDescription>
                Find instructions, tips, and example prompts to get the most out of Nexus AI.
            </CardDescription>
        </CardHeader>
      </Card>
      
      <Card>
        <CardHeader>
            <div className='flex items-center gap-2'>
                <BookOpen className="h-5 w-5" />
                <CardTitle>How to Use Nexus AI</CardTitle>
            </div>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
            <p>Nexus AI is designed to be intuitive. Here’s the primary workflow:</p>
            <ol className="list-decimal list-inside space-y-2 pl-4">
                <li>
                    <strong>Submit a Goal:</strong> Go to the <a href="/dashboard" className="text-primary hover:underline">Dashboard</a> and use the "Goal-Based Task Management" form. Type a high-level objective in natural language (e.g., "Deploy the new marketing site").
                </li>
                <li>
                    <strong>AI Planning:</strong> Nexus AI's Planner Agent will analyze your goal and break it down into a series of actionable, technical steps. A new task will appear in the "Recent Tasks" list.
                </li>
                <li>
                    <strong>Monitor Execution:</strong> Watch the task's progress in real-time. You can click "Details" to see the status of each individual step and any logs from the (simulated) execution.
                </li>
                 <li>
                    <strong>Handle Issues:</strong> If an alert appears (e.g., "High CPU"), use the "Resolve with AI" button to have Nexus autonomously create a new task to fix it. If a task fails, use "Retry with AI" to let the agent analyze the failure and attempt a corrected plan.
                </li>
                <li>
                    <strong>Review Reports:</strong> For completed or failed tasks, view the AI-generated Root Cause Analysis (RCA) report to understand what happened.
                </li>
            </ol>
        </CardContent>
      </Card>

       <Card>
        <CardHeader>
            <div className='flex items-center gap-2'>
                <Lightbulb className="h-5 w-5" />
                <CardTitle>Example Task Prompts</CardTitle>
            </div>
             <CardDescription>
                Use these prompts as inspiration for your own goals.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>View Example Prompts</AccordionTrigger>
                    <AccordionContent>
                        <ul className="list-disc space-y-2 pl-5 font-mono text-sm text-accent-foreground/90">
                            {examplePrompts.map((prompt, index) => (
                                <li key={index}>
                                    <p>{prompt}</p>
                                </li>
                            ))}
                        </ul>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
