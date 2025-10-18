# Nexus AI – Autonomous IT Co-Manager

Nexus is a proactive Agentic AI solution for IT management that redefines IT operations by moving beyond simple automation to create a truly autonomous, intelligent partner. Unlike traditional IT automation tools that only follow predefined rules, Nexus can understand high-level goals and independently plan, execute, and adapt its actions to achieve them. It acts as an intelligent "project manager" for your IT infrastructure, handling everything from routine tasks to complex, multi-step problem-solving.

This project was built for the SuperHack 2025 (Google Cloud + Firebase AI Challenge).

## 🚀 The Nexus Advantage: Key Features

*   **Real-time Dashboard**: A central web application for IT managers to oversee the agent's actions, view performance metrics, and set high-level goals.
*   **Goal-Based Task Management**: Users can give the agent natural language goals (e.g., "Ensure all systems are patched to the latest security standards").
*   **Multi-step Task Execution**: The agent can break down a single goal into multiple, sequential tasks and execute them across different systems.
*   **Proactive Issue Resolution**: Identifies and fixes problems autonomously without waiting for a human to create a ticket or send a command.
*   **Conversational AI with Voice**: Allows for quick, natural-language interaction with the agent through a chat interface that supports both voice input (Speech-to-Text) and spoken audio responses (Text-to-Speech).
*   **Automated Root Cause Analysis**: Generates detailed reports explaining its reasoning and the steps it took to solve a problem.
*   **Third-Party Integrations**: Seamlessly connects with existing IT tools like Jira for ticketing, Slack for communication, and various monitoring systems.

## 🛠️ Technology Stack

| Layer      | Tools / Frameworks                                        |
|------------|-----------------------------------------------------------|
| **Frontend**   | Next.js (App Router), TypeScript, Tailwind CSS, ShadCN UI, Recharts |
| **Backend**    | Next.js Server Actions, Firebase Authentication           |
| **AI Layer**   | Google Gemini Pro API + Genkit (including TTS models)     |
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
*   `src/ai/flows/`: Genkit flows that define the AI agents' logic (Planner, Executor, Reporter, TTS).
*   `src/components/`: Reusable React components, including UI elements from ShadCN.
*   `src/lib/`: Core application logic, including server actions (`actions.ts`) and data type definitions.
*   `src/firebase/`: Firebase configuration, providers, and custom hooks for interacting with Firebase services.
*   `firestore.rules`: Defines the security rules for the Firestore database, allowing public read access for the demo.
*   `PROJECT_REPORT.md`: A detailed report covering the project's architecture, features, and implementation journey.
