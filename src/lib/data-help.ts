import { Terminal, ListChecks, FileText, Zap } from 'lucide-react';
import { UnderstandIcon, PlanIcon, MonitorIcon, ReportIcon } from '@/components/icons';

export const thinkingSteps = [
  { name: '1. Submit Goal', icon: UnderstandIcon, description: 'Manager provides a high-level objective.' },
  { name: '2. AI Creates Plan', icon: PlanIcon, description: 'Nexus AI breaks the goal into technical steps.' },
  { name: '3. Autonomous Execution', icon: MonitorIcon, description: 'AI agents execute the plan, monitored by the manager.' },
  { name: '4. Review & Analyze', icon: ReportIcon, description: 'Manager reviews the outcome and AI-generated RCA report.' },
];

export const examplePromptCategories = [
    {
        category: "Security & Patching",
        prompts: [
            "Apply critical security patches to all internet-facing production web servers.",
            "Run a full vulnerability scan on the customer database and report findings.",
            "Rotate all SSL certificates that are due to expire in the next 30 days.",
            "Review and enforce firewall rules to block traffic from known malicious IP ranges.",
            "Isolate the staging server 'stg-web-03' from the network due to a security alert.",
            "Perform a security audit of all user accounts with administrative privileges.",
            "Update the anti-virus definitions on all Windows servers and workstations.",
            "Verify that all cloud storage buckets have public access disabled.",
            "Generate a report of all systems that are not compliant with the company's password policy.",
            "Harden the SSH configuration on all Linux servers according to CIS benchmarks."
        ]
    },
    {
        category: "Infrastructure Management",
        prompts: [
            "Provision a new large-sized virtual machine in the US-East-1 region for the 'Project Titan' staging environment.",
            "Decommission the old database server 'legacy-db-01' after ensuring a full backup is complete.",
            "Increase the disk size of the 'analytics-data-server' by 200GB.",
            "Reboot the entire staging environment in the correct order, starting with the database layer.",
            "Migrate the 'marketing-website' from its current on-prem server to a new cloud instance.",
            "Create a new virtual network for the QA team, isolated from production.",
            "Configure a load balancer for the new cluster of application servers.",
            "Take a snapshot of all virtual machines in the 'Development' resource group.",
            "Clean up all unused temporary files older than 90 days from the shared file server.",
            "Generate a cost report for all cloud resources tagged with 'department: R&D' for the last month."
        ]
    },
    {
        category: "User & Access Control",
        prompts: [
            "Onboard the new developer 'j.doe' with access to the engineering team's standard applications and code repositories.",
            "Offboard the contractor 's.jones' by disabling all their accounts and revoking access immediately.",
            "Grant user 'a.smith' temporary read-only access to the production database for an audit.",
            "Reset the password for user 'm.williams' and force a password change on next login.",
            "Create a new user group called 'Marketing-Analytics' with access to the analytics dashboard.",
            "Audit all external user accounts and report on any that have not logged in for over 60 days.",
            "Revoke 'dev-team' access to the billing API in the production environment.",
            "List all users who have access to the main financial records database.",
            "Add 'b.carter' to the 'vpn-users' security group.",
            "Set up a new shared folder for the legal team with restricted access."
        ]
    },
    {
        category: "Monitoring & Reporting",
        prompts: [
            "Generate a root cause analysis report for the 'API-Gateway' service outage last night.",
            "Set up an alert to notify the on-call engineer if CPU usage on any web server exceeds 90% for 5 minutes.",
            "Create a weekly performance report for the main application, including average response time and error rate.",
            "Investigate the source of the unusual spike in network traffic on 'worker-vm-05'.",
            "What was the root cause of the database connection errors yesterday?",
            "Summarize all high-severity alerts from the last 24 hours.",
            "Export the application logs from the 'user-service' between 2:00 AM and 3:00 AM this morning.",
            "Create a dashboard chart showing the memory usage trend for the top 5 most active servers.",
            "Check the health status of all services related to the 'Checkout' user journey.",
            "Notify the #devops channel on Slack if the latest build pipeline fails."
        ]
    }
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
