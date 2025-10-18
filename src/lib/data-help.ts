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

export const featureGuide = [
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
