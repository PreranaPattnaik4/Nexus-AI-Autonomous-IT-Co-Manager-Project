

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CircleHelp, Lightbulb, ShieldCheck, AlertTriangle, Phone } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

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
            Instructions, tips, and policies for using Nexus AI.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="border-destructive">
        <CardHeader>
            <div className='flex items-center gap-2 text-destructive'>
                <AlertTriangle className="h-5 w-5" />
                <CardTitle>Important Advisory on AI Usage</CardTitle>
            </div>
             <CardDescription className="!text-destructive/90">
                <p className="font-bold">Nexus AI is an assistive tool. Always verify outputs and consult human experts before making professional, financial or safety-critical decisions.</p>
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
             <ul className="list-disc space-y-2 pl-5">
                <li>
                    <strong>The AI can make mistakes.</strong> It can provide incomplete or incorrect information. Always verify important outputs before acting on them.
                </li>
                <li>
                    <strong>Do not rely on the AI for critical decisions.</strong> Do not make professional, legal, medical, financial, or safety-critical decisions based solely on its results. Use it to inform your work, then validate with qualified human experts.
                </li>
                 <li>
                    <strong>Check twice before acting.</strong> Before acting on a suggestion that affects money, strategy, or infrastructure, double-check the data, test in a safe environment, and consult a domain expert.
                </li>
                 <li>
                    <strong>You are responsible.</strong> The user and their organization are responsible for decisions taken based on AI output. We recommend legal review and internal approval processes for critical actions.
                </li>
                 <li>
                     <strong>Report issues.</strong> If you suspect an error or harmful suggestion, <Link href="/contact" className="text-primary hover:underline">report it here.</Link> We review feedback to improve our systems.
                </li>
            </ul>
             <div className="mt-6 rounded-lg border border-dashed p-4 text-center">
                <div className="flex items-center justify-center gap-2">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <h4 className="font-semibold">Need Expert Help?</h4>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                    For critical issues, you can escalate to a human reviewer.
                </p>
                <Button variant="outline" size="sm" className="mt-3" asChild>
                    <Link href="/contact">Contact Support</Link>
                </Button>
            </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Use Nexus AI</CardTitle>
          <CardDescription>Follow these steps to get started.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
            <p>Nexus AI is designed to be your autonomous IT co-manager. Here’s the primary workflow to get the most out of it:</p>
            <ol className="list-decimal list-inside space-y-2 pl-4">
                <li>
                    <strong>Submit a Goal:</strong> Navigate to the <a href="/dashboard" className="text-primary hover:underline">Dashboard</a> and use the "Goal-Based Task Management" form. Describe a high-level objective in plain English (e.g., "Deploy the new marketing site").
                </li>
                <li>
                    <strong>Let the AI Plan:</strong> Nexus AI's Planner Agent will analyze your goal and break it down into a series of actionable, technical steps. A new task will be created and appear in the "Recent Tasks" list.
                </li>
                <li>
                    <strong>Monitor Execution:</strong> Watch the task's progress in real-time on the dashboard or in the tasks list. You can click "Details" to see the status of each individual step and any logs from the (simulated) execution.
                </li>
                 <li>
                    <strong>Handle Issues Autonomously:</strong> If an alert appears on the dashboard (e.g., "High CPU"), use the "Resolve with AI" button to have Nexus autonomously create and execute a new task to fix it. If a task fails, use the "Retry with AI" button to let the agent analyze the failure and attempt a new, corrected plan.
                </li>
                <li>
                    <strong>Review Reports:</strong> For any completed or failed task, you can view the AI-generated Root Cause Analysis (RCA) report to get a detailed understanding of what happened, why it happened, and how it was resolved.
                </li>
            </ol>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <div className='flex items-center gap-2'>
                <Lightbulb className="h-5 w-5" />
                <CardTitle>Tips for Effective Goals</CardTitle>
            </div>
            <CardDescription>Write clear and actionable goals for the best results.</CardDescription>
        </CardHeader>
        <CardContent>
            <ul className="list-disc space-y-2 pl-5 text-sm">
                <li>
                    <strong>Be Specific:</strong> Instead of "update server," try "Apply latest security patches to the main production web server."
                </li>
                <li>
                    <strong>State the Objective:</strong> Clearly define the desired end state. For example, "Onboard the new user 'jdoe' to the engineering team's standard applications."
                </li>
                <li>
                    <strong>One Goal at a Time:</strong> Focus on one primary objective per task. The AI will break it down into multiple steps.
                </li>
            </ul>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <div className='flex items-center gap-2'>
                <ShieldCheck className="h-5 w-5" />
                <CardTitle>Usage Policy & Rules</CardTitle>
            </div>
            <CardDescription>This is a demo environment with simulated actions.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
            <p>
                Please be aware of the following:
            </p>
             <ul className="list-disc space-y-2 pl-5">
                <li>
                    <strong>Simulation Only:</strong> All task executions are simulated. No real commands are run on any servers, and no actual changes are made to your infrastructure.
                </li>
                <li>
                    <strong>No Real Data:</strong> The systems, alerts, and reports are generated for demonstration purposes. Do not input sensitive or real-world production data.
                </li>
                <li>
                    <strong>Educational Use:</strong> This tool is intended to showcase the capabilities of agentic AI for IT management. Use it to understand how such a system can automate and reason through complex tasks.
                </li>
                 <li>
                    <strong>Responsible AI:</strong> The simulation-only nature of this tool is a core part of its design, ensuring a safe environment for exploring AI capabilities without real-world risk.
                </li>
            </ul>
        </CardContent>
      </Card>
    </div>
  );
}

    