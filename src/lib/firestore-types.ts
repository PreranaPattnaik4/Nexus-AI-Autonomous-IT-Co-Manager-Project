/**
 * This file contains static types for the frontend-only demo.
 * In a real application, these might be generated or shared from the backend.
 */

export type Step = {
  description: string;
  status: 'pending' | 'completed' | 'failed';
  log?: string;
  action: string;
  parameters?: Record<string, any>;
};

export type Task = {
  id: string;
  goal: string;
  status: 'in-progress' | 'completed' | 'failed' | 'superseded';
  progress: number;
  steps: Step[];
  createdAt: Date;
};

export type Alert = {
  id: string;
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  timestamp: Date;
};

export type System = {
    id: string;
    name: string;
    status: 'online' | 'offline' | 'degraded';
    cpuUsage: number;
    memoryUsage: number;
};

export type Report = {
  id: string;
  taskId: string;
  report: string;
  generatedAt: Date;
}

export type ChatMessage = {
    id: string;
    role: 'user' | 'model';
    content: string;
    createdAt: Date;
};

export type CommandSimulationResult = {
    id:string;
    command: string;
    output: string;
    timestamp: Date;
};
