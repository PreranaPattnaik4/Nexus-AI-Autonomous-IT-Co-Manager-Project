import { Terminal, ListChecks, FileText, Zap } from 'lucide-react';
import { UnderstandIcon, PlanIcon, MonitorIcon, ReportIcon } from '@/components/icons';

export const thinkingSteps = [
  { name: '1. Submit Goal', icon: UnderstandIcon, description: 'Manager provides a high-level objective.' },
  { name: '2. AI Creates Plan', icon: PlanIcon, description: 'Nexus AI breaks the goal into technical steps.' },
  { name: '3. Autonomous Execution', icon: MonitorIcon, description: 'AI agents execute the plan, monitored by the manager.' },
  { name: '4. Review & Analyze', icon: ReportIcon, description: 'Manager reviews the outcome and AI-generated RCA report.' },
];

export const examplePrompts = [
    "Ensure all production servers are patched to the latest security standards.",
    "Onboard a new developer to the 'project-x' repository by granting access and sending a welcome email.",
    "Diagnose and resolve the high CPU usage on the cache server.",
    "Reboot the staging database server and notify the team on Slack.",
    "Run a full system backup and verify the integrity of the backup file.",
    "Deploy the latest version of the web application to the staging environment."
];

export const featureGuideCards = [
    {
        title: "Command Console",
        icon: Terminal,
        description: "Test the AI's knowledge of shell commands in a simulated terminal environment.",
        href: "/console"
    },
    {
        title: "Task Views",
        icon: ListChecks,
        description: "Filter and view tasks by their status: in-progress, completed, or failed.",
        href: "/tasks"
    },
    {
        title: "Report History",
        icon: FileText,
        description: "Review detailed, AI-generated Root Cause Analysis (RCA) reports for past tasks.",
        href: "/history"
    },
    {
        title: "Integrations",
        icon: Zap,
        description: "Manage connections to third-party services like Jira and Slack.",
        href: "/integrations"
    }
];
