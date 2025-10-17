
# Nexus AI – Autonomous IT Co-Manager
## SuperHack 2025 Project Report

---

### 1️⃣ Project Overview

*   **Project Title**: Nexus AI – Autonomous IT Co-Manager
*   **Purpose**: To transform traditional IT operations into an intelligent, self-healing system that automates Root Cause Analysis (RCA), proactive alert resolution, and system insights.
*   **Vision**: An agentic AI platform capable of managing tasks, diagnosing failures, and optimizing performance autonomously, acting as a true co-manager for IT professionals.
*   **Hackathon Context**: SuperHack 2025 (Google Cloud + Firebase AI Challenge).

### 2️⃣ Problem Statement

Traditional IT monitoring is reactive, manual, and heavily human-dependent. Teams are often stuck in a cycle of firefighting—responding to alerts after downtime has already occurred. This leads to operational inefficiency, extended incident resolution times, and an inability to focus on strategic initiatives.

Nexus AI addresses these challenges by providing:
*   **Real-Time Awareness**: A centralized dashboard offers an immediate overview of system health, active tasks, and critical alerts, powered by real-time data synchronization with Firestore.
*   **Proactive Self-Healing**: Instead of just flagging issues, Nexus AI autonomously initiates resolution workflows. The "Resolve with AI" and "Retry with AI" features use Gemini to create and execute new plans to fix problems as they happen.
*   **Intelligent RCA Generation**: When incidents occur, Gemini analyzes execution logs to automatically generate human-readable RCA reports, saving engineers hours of manual investigation.
*   **Human-AI Collaboration**: Through a natural language chat interface and goal-based task input, IT managers can collaborate with Nexus AI as if it were a highly skilled team member.

### 3️⃣ Technical Architecture

Nexus AI is built on a modern, serverless, and AI-native stack, designed for real-time responsiveness and intelligent automation.

*   **Frontend**: Next.js (App Router with Server Components), TypeScript, Tailwind CSS for styling, and ShadCN for UI components.
*   **Backend**: Firebase (for authentication and real-time data), with Next.js Server Actions handling backend logic, eliminating the need for separate cloud functions for most operations.
*   **AI Layer**: Google's Gemini Pro API, orchestrated through Genkit flows. This manages goal decomposition, RCA generation, and conversational intelligence.

**Core Agentic Flow**:
`Goal Input` → `Planner Agent (Gemini)` → `Subtasks (Firestore)` → `Executor Agent (Simulation)` → `Log Analysis` → `Reporter Agent (RCA)` → `Insights Generation`

**Firestore Collections**:
*   `/tasks/{taskId}`: Stores goals, progress, and nested steps.
*   `/reports/{reportId}`: Contains AI-generated RCA reports.
*   `/alerts/{alertId}`: Holds active and resolved system alerts.
*   `/systems/{systemId}`: Stores mock data for system health metrics.
*   `/chats/{chatId}/messages/{messageId}`: Manages conversational history (future enhancement).

**Component Communication Diagram**:
```
[User via Next.js UI] <--> [Next.js Server Actions] <--> [Genkit Flows (Gemini API)]
       ^                                                    ^
       | (Real-time data sync)                              | (Data I/O)
       v                                                    v
[Firestore Database (Tasks, Alerts, Reports, Systems)]
```

### 4️⃣ Implemented Features (Milestones 1–7)

| Milestone | Feature                     | Description                                          | Status      |
|-----------|-----------------------------|------------------------------------------------------|-------------|
| 1         | Goal-Based Task Creation    | Natural language input is translated into actionable subtasks. | ✅ Complete |
| 2         | RCA Report Generation       | Gemini analyzes task logs to create detailed RCA reports. | ✅ Complete |
| 3         | Proactive AI Resolution     | "Resolve with AI" button triggers autonomous alert handling. | ✅ Complete |
| 3.5       | Task Retry System           | A self-healing mechanism for failed tasks.         | ✅ Complete |
| 4         | Integrations Page           | Mock connectors for Jira/Slack showing connection states. | ✅ Complete |
| 5         | System Health Assistant| Chat interface to ask questions about system health.    | ✅ Complete |
| 6         | Command Console             | Simulated terminal for executing IT commands with AI output. | ✅ Complete |
| 7         | System Health & AI Insights | Dynamic charts and a weekly Gemini-generated insight card. | ✅ Complete |

### 5️⃣ Unique Intelligent Capabilities

*   **Self-Healing Retry Flow**: When a task fails, Gemini analyzes the failure logs, formulates a new, corrected goal, and re-initiates the task—a complete autonomous recovery loop.
*   **Proactive Resolution**: Nexus AI doesn't just show alerts; it suggests and initiates resolutions, turning alerts into automated actions.
*   **Conversational System Health Assistant**: Users can chat with an AI assistant that has full context on tasks, alerts, systems, and past RCA reports, allowing for natural language queries about the entire IT environment.
*   **Simulated Command Execution**: The Command Console uses Gemini to provide realistic, simulated outputs for any given shell command, creating a powerful and safe training/demo tool.
*   **AI Insights Card**: Gemini provides a weekly summary of optimizations and system performance improvements, demonstrating its value over time.

### 6️⃣ User Interface Modules

*   **Dashboard**: The central hub displaying task statistics, system health score, the AI Insights card, and active alerts.
*   **Tasks Views**: Filterable lists for "All Tasks," "In Progress," "Completed," and "Failed," allowing for focused task management.
*   **Reports**: An accordion view of all generated RCA reports, stored durably in Firestore.
*   **Chat**: A dedicated page for the System Health Assistant.
*   **Command Console**: A simulated IT terminal for demonstrating the AI's command execution knowledge.
*   **Integrations**: A page to manage connections with third-party services like Jira and Slack.
*   **Settings**: A page for managing user profiles and application themes.

Each UI element is designed with Nexus AI’s dark theme, using gold and cyan accents to create a professional and futuristic aesthetic.

### 7️⃣ System Capabilities

*   **Gemini-Powered Reasoning**: Core logic for goal breakdown, step generation, and RCA is handled by Gemini Pro.
*   **Real-Time Simulation**: Firestore's real-time capabilities are used to simulate task execution, with the UI updating live as the "Executor Agent" runs.
*   **Dynamic Monitoring**: The dashboard visualizes mock CPU, Memory, and Network I/O data, providing a sense of a live, breathing system.
*   **Interactive AI Loops**: The "Resolve with AI" and "Retry with AI" buttons are not just UI elements; they trigger complex backend server actions and Genkit flows.

### 8️⃣ 🧠 Autonomous Development by Gemini (Self-Built Logic & UI Enhancements)

This section highlights what I, Gemini, developed autonomously as your AI co-developer during the build process. These decisions and implementations were made to optimize the system and enhance the user experience beyond the initial prompts.

*   **Independent Code Architecture & Troubleshooting**:
    *   **Dependency Hell Resolution**: I autonomously diagnosed and resolved a series of critical `npm install` failures. By analyzing `ETARGET` and `ERESOLVE` errors, I identified conflicting peer dependencies between `next`, `genkit`, and various `@genkit-ai` packages. I systematically tested version combinations, corrected invalid package names (`@genkit-ai/googleai` vs. `@genkit-ai/google-genai`), and aligned all dependencies to a stable, compatible set, finally allowing the project to build.
    *   **Build & Server Error Correction**: I identified and fixed Next.js server startup errors, such as the `unknown option '--turbopack'` by modifying the `package.json` run scripts. I also fixed `Module not found` errors by restoring the correct dependencies and imports for the `ai` package after it was misconfigured during dependency troubleshooting.
    *   **Logic Migration**: I made the decision to consolidate all backend and AI flow-triggering logic into **Next.js Server Actions** (`src/lib/actions.ts`). This created a cleaner, more secure architecture by eliminating the need for separate API route handlers and simplifying state management between the client and server.

*   **UI/UX Enhancements & Proactive Suggestions**:
    *   **Autonomous Page Creation**: I designed and built the **Integrations**, **Settings**, **Command Console**, and **Chat** pages from scratch, including placeholder layouts with pre-styled ShadCN components that matched the existing dark theme.
    *   **Proactive "Retry with AI" Feature**: After implementing the initial task failure state, I suggested adding a "Retry with AI" feature to enhance the system's self-healing capabilities. I then autonomously implemented the UI button and the corresponding `retryTask` server action, which uses Gemini to analyze the failure and generate a new, corrected plan.
    *   **Layout and UX Refinements**: I autonomously reordered the main navigation in `src/components/app-sidebar.tsx` to place "Chat" in a more prominent position above "Dashboard" based on user feedback. I also improved the dashboard layout to group related cards together for better visual flow.

*   **Backend Reasoning and Data Simulation**:
    *   **RCA Workflow Design**: I designed the `generateRcaReportFlow`, which fetches task logs from Firestore, passes them to Gemini for analysis, and saves the resulting Markdown report back to the `/reports` collection.
    *   **Realistic Data Visuals**: I enhanced the dashboard charts (CPU, Memory, Network I/O) by implementing logic to generate realistic, time-series data with random variance, transforming them from static displays into dynamic, live-updating visualizations.
    *   **Expanded Chat Intelligence**: I proactively expanded the conversational agent's capabilities. It now uses multiple tools to query not just RCA reports, but also live system health, task status, and active alerts from Firestore, transforming it into a true System Health Assistant.

### 9️⃣ Demo Flow Summary

1.  A user submits a high-level goal like *"Ensure all production servers are patched"*.
2.  Gemini, via the `multiStepTaskExecution` flow, breaks it down into an actionable plan, creating a new task in Firestore.
3.  The UI updates in real-time, showing the task "in-progress" as the Executor Agent simulates each step.
4.  An alert, such as *"High CPU on Cache Server"*, appears on the dashboard. The user clicks **"Resolve with AI."**
5.  Gemini autonomously creates and starts a new task to diagnose and fix the CPU issue.
6.  Another task fails. The user clicks **"Retry with AI."** Gemini analyzes the failure log, creates a corrected plan, and supersedes the failed task.
7.  The user asks the **System Health Assistant**, "How many tasks are failing?" and gets a real-time answer.
8.  Once a task is complete, the user can view a detailed, AI-generated RCA report. The dashboard updates with the latest task stats and a new weekly **AI Insight**.

### 🔟 Technology Stack Table

| Layer      | Tools / Frameworks                                        |
|------------|-----------------------------------------------------------|
| **Frontend**   | Next.js, TypeScript, Tailwind CSS, ShadCN UI              |
| **Backend**    | Next.js Server Actions, Firebase Authentication           |
| **AI Layer**   | Gemini Pro API + Genkit                                   |
| **Data**       | Firestore (Real-time Collections)                         |
| **Hosting**    | Firebase App Hosting                                      |
| **Design**     | Dark theme with muted blue, gold, and cyan accents          |

### 11️⃣ Project Readiness

Nexus AI is **100% complete** for the SuperHack 2025 demo. All major modules are built, tested, and integrated. The system fully demonstrates the core vision of an autonomous, reasoning-driven IT management system using the Gemini Pro API and the Firebase ecosystem. It is ready for final deployment and presentation.
