'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Lightbulb, BookOpen, CircleHelp, Bot, Terminal, ListChecks, Loader, CheckCheck, XCircle, FileText, Zap } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { UnderstandIcon, PlanIcon, MonitorIcon, ReportIcon } from '@/components/icons';
import React from 'react';


const thinkingSteps = [
  { name: '1. Submit Goal', icon: UnderstandIcon, description: 'Manager provides a high-level objective.' },
  { name: '2. AI Creates Plan', icon: PlanIcon, description: 'Nexus AI breaks the goal into technical steps.' },
  { name: '3. Autonomous Execution', icon: MonitorIcon, description: 'AI agents execute the plan, monitored by the manager.' },
  { name: '4. Review & Analyze', icon: ReportIcon, description: 'Manager reviews the outcome and AI-generated RCA report.' },
];

function Connector({ isLast = false }: { isLast?: boolean }) {
  if (isLast) return null;
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="w-full h-px bg-border -mx-2"></div>
    </div>
  );
}

const examplePrompts = [
    "Ensure all production servers are patched to the latest security standards.",
    "Onboard a new developer to the 'project-x' repository by granting access and sending a welcome email.",
    "Diagnose and resolve the high CPU usage on the cache server.",
    "Reboot the staging database server and notify the team on Slack.",
    "Run a full system backup and verify the integrity of the backup file.",
    "Deploy the latest version of the web application to the staging environment."
];

const featureGuide = [
    {
        title: "Command Console",
        icon: Terminal,
        content: "The Command Console provides a simulated terminal environment where you can test the AI's knowledge of shell commands. Type any standard command (e.g., `kubectl get pods`, `ls -la`, `docker ps`) and the AI will generate a realistic, static output. It's a safe and powerful tool for demonstrations and training."
    },
    {
        title: "Task Views",
        icon: ListChecks,
        content: "The sidebar provides several filtered views for tasks: **All Tasks** shows every task created. **In Progress** shows what the agent is currently working on. **Completed** lists all successfully finished tasks. **Failed** shows tasks that encountered an error, allowing you to trigger the 'Retry with AI' self-healing flow."
    },
    {
        title: "Reports",
        icon: FileText,
        content: "The Reports page contains a full history of all AI-generated Root Cause Analysis (RCA) reports. For any task that is completed or has failed, you can view a detailed analysis created by Gemini, which breaks down the summary, timeline, and resolution steps."
    },
    {
        title: "Integrations",
        icon: Zap,
        content: "The Integrations page shows the connection status of third-party tools like Jira and Slack. In this demo, these are static examples, but in a real-world scenario, this is where you would manage your connections to enable features like automated ticketing and notifications."
    }
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
                <Bot className="h-5 w-5" />
                <CardTitle>The IT Manager's Workflow Pipeline</CardTitle>
            </div>
            <CardDescription>From goal to resolution, here’s how Nexus AI automates your tasks.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-start justify-center pt-2">
            {thinkingSteps.map((step, index) => (
            <React.Fragment key={step.name}>
                <div className="flex flex-col items-center text-center w-36">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-secondary text-secondary-foreground mb-2">
                    <step.icon className="h-6 w-6" />
                </div>
                <p className="text-xs font-semibold">{step.name}</p>
                <p className="text-xs text-muted-foreground mt-1 hidden md:block">{step.description}</p>
                </div>
                <Connector isLast={index === thinkingSteps.length - 1} />
            </React.Fragment>
            ))}
        </CardContent>
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
          <CardTitle>Feature Guide</CardTitle>
          <CardDescription>Learn about the key sections of the application.</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {featureGuide.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger>
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4" />
                      <span className='font-semibold'>{feature.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-9 text-muted-foreground">
                    {feature.content}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
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
