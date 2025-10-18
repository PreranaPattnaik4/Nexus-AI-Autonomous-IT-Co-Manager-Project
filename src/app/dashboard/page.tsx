import Link from 'next/link';
import { GoalForm } from '@/components/dashboard/goal-form';
import { TasksList } from '@/components/dashboard/tasks-list';
import { MetricsCharts } from '@/components/dashboard/metrics-charts';
import { AlertsCard } from '@/components/dashboard/alerts-card';
import { TaskStats } from '@/components/dashboard/task-stats';
import { SystemHealthSummary } from '@/components/dashboard/system-health-summary';
import { AiInsightsCard } from '@/components/dashboard/ai-insights-card';
import { GeminiThinkingMap } from '@/components/dashboard/gemini-thinking-map';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, BookOpen, Bot, ArrowRight } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { UnderstandIcon, PlanIcon, MonitorIcon, ReportIcon } from '@/components/icons';
import React from 'react';
import { featureGuideCards, examplePrompts, thinkingSteps } from '@/lib/data-help';

function Connector({ isLast = false }: { isLast?: boolean }) {
  if (isLast) return null;
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="w-full h-px bg-border -mx-2"></div>
    </div>
  );
}

function HelpContent() {
  return (
    <div className="space-y-6 mt-6">
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
          <CardTitle>Feature Guide</CardTitle>
          <CardDescription>Learn about the key sections of the application.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {featureGuideCards.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="flex flex-col text-center items-center p-6 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-secondary text-secondary-foreground mb-4">
                        <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground mb-4 flex-1">{feature.description}</p>
                     <Button variant="outline" size="sm" asChild>
                        <Link href={feature.href}>
                            Explore <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </Card>
              );
            })}
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


export default function DashboardPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const status = searchParams?.status as 'in-progress' | 'completed' | 'failed' | undefined;
  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-5">
      <div className="col-span-1 lg:col-span-5">
        <TaskStats />
      </div>

      <div className="lg:col-span-2 grid grid-cols-1 gap-6">
        <SystemHealthSummary />
        <AiInsightsCard />
      </div>
      
      <div className="col-span-1 lg:col-span-3 grid grid-cols-1 lg:grid-cols-1 gap-6">
        <div className="lg:col-span-1">
            <GoalForm />
        </div>
        <div className="lg:col-span-1">
            <GeminiThinkingMap />
        </div>
      </div>

      <div className="col-span-1 lg:col-span-5">
        <AlertsCard />
      </div>

      <div className="col-span-1 lg:col-span-5">
        <TasksList statusFilter={status} />
      </div>

      <div className="col-span-1 lg:col-span-5">
        <MetricsCharts />
      </div>
      
      <div className="col-span-1 lg:col-span-5">
        <HelpContent />
      </div>
    </div>
  );
}
