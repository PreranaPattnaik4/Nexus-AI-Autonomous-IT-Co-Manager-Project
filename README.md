# Nexus AI – Autonomous IT Co-Manager

Nexus AI is an intelligent, agentic platform designed to transform IT operations. It acts as an autonomous co-manager for IT professionals, capable of managing tasks, diagnosing failures, and optimizing system performance with minimal human intervention.

This project was built for the SuperHack 2025 (Google Cloud + Firebase AI Challenge).

## 🚀 Key Features

*   **Goal-Based Task Management**: Submit high-level goals in natural language (e.g., "Ensure all production servers are patched"), and Nexus AI's Planner Agent breaks them down into actionable, multi-step tasks.
*   **Autonomous Execution & Simulation**: The Executor Agent simulates the execution of tasks, with real-time progress updates reflected in the UI.
*   **Proactive Alert Resolution**: Nexus AI doesn't just display alerts; it uses its "Resolve with AI" capability to autonomously create and execute a plan to fix the issue.
*   **AI-Powered Self-Healing**: When a task fails, the "Retry with AI" feature allows the system to analyze the failure logs, formulate a corrected plan, and re-initiate the task.
*   **Automated RCA Reporting**: The Reporter Agent analyzes execution logs to generate detailed, human-readable Root Cause Analysis (RCA) reports in Markdown.
*   **System Health Assistant**: A conversational chat interface (with voice input) that allows users to ask questions about system health, task status, alerts, and RCA reports.
*   **Dynamic Dashboard**: A real-time overview of system health, task statistics, active alerts, and AI-generated weekly insights.
*   **Secure Authentication**: Full user authentication system powered by Firebase, supporting both email/password and Google Sign-In.

## 🛠️ Technology Stack

| Layer      | Tools / Frameworks                                        |
|------------|-----------------------------------------------------------|
| **Frontend**   | Next.js (App Router), TypeScript, Tailwind CSS, ShadCN UI, Recharts |
| **Backend**    | Next.js Server Actions, Firebase Authentication           |
| **AI Layer**   | Google Gemini Pro API + Genkit                            |
| **Data**       | Firestore (Real-time Collections)                         |
| **Hosting**    | Firebase App Hosting                                      |

## 🏁 Getting Started

This is a Firebase Studio project, which simplifies setup and deployment.

### Prerequisites

*   Node.js and npm installed.
*   A Firebase project with Firestore and Authentication enabled.

### Installation & Running Locally

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run the Development Servers**:
    This project requires two development servers to be running simultaneously:
    *   The Next.js frontend server.
    *   The Genkit development server for the AI flows.

    You can run them in separate terminal windows:

    **Terminal 1: Run the Next.js App**
    ```bash
    npm run dev
    ```
    Your application will be available at `http://localhost:3000`.

    **Terminal 2: Run the Genkit Flows**
    ```bash
    npm run genkit:watch
    ```
    This command starts the Genkit development server and watches for changes in your AI flow files.

### Project Structure

*   `src/app/`: Contains all the pages and layouts for the Next.js application (using the App Router).
*   `src/ai/flows/`: Genkit flows that define the AI agents' logic (Planner, Executor, Reporter).
*   `src/components/`: Reusable React components, including UI elements from ShadCN.
*   `src/lib/`: Core application logic, including server actions (`actions.ts`) and data type definitions.
*   `src/firebase/`: Firebase configuration, providers, and custom hooks for interacting with Firebase services.
*   `firestore.rules`: Defines the security rules for the Firestore database, allowing public read access for the demo.
*   `PROJECT_REPORT.md`: A detailed report covering the project's architecture, features, and implementation journey.
