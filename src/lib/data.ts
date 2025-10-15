export type Step = {
  description: string;
  status: 'pending' | 'completed' | 'failed';
  log?: string;
};

export type Task = {
  id: string;
  goal: string;
  status: 'in-progress' | 'completed' | 'failed';
  progress: number;
  steps: Step[];
};

export type Alert = {
  id: string;
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  timestamp: string;
};

export const initialTasks: Task[] = [
  {
    id: 'task-1',
    goal: 'Patch all production web servers for CVE-2024-12345',
    status: 'in-progress',
    progress: 40,
    steps: [
      { description: 'List all production web servers', status: 'completed', log: 'Found 10 servers matching criteria.' },
      { description: 'Apply patch to server-01', status: 'completed', log: 'Patch successfully applied.' },
      { description: 'Apply patch to server-02', status: 'completed', log: 'Patch successfully applied.' },
      { description: 'Apply patch to server-03', status: 'in-progress', log: 'Applying patch...' },
      { description: 'Apply patch to server-04', status: 'pending' },
      { description: 'Verify patches on all servers', status: 'pending' },
      { description: 'Create Jira ticket for confirmation', status: 'pending' },
    ],
  },
  {
    id: 'task-2',
    goal: 'Reboot all staging database VMs',
    status: 'completed',
    progress: 100,
    steps: [
        { description: 'List staging DB VMs', status: 'completed', log: 'Found 3 VMs.' },
        { description: 'Reboot vm-db-stage-01', status: 'completed', log: 'Reboot command sent.' },
        { description: 'Reboot vm-db-stage-02', status: 'completed', log: 'Reboot command sent.' },
        { description: 'Reboot vm-db-stage-03', status: 'completed', log: 'Reboot command sent.' },
        { description: 'Verify all VMs are back online', status: 'completed', log: 'All VMs ping successful.' },
    ],
  },
  {
    id: 'task-3',
    goal: 'Diagnose high latency on payment gateway API',
    status: 'failed',
    progress: 50,
    steps: [
        { description: 'Check API endpoint health', status: 'completed', log: 'Endpoint is responsive.' },
        { description: 'Analyze resource utilization', status: 'completed', log: 'CPU at 95%, Memory at 90%.' },
        { description: 'Attempt to scale up service', status: 'failed', log: 'Scaling failed: Insufficient quota.' },
        { description: 'Send Slack alert to on-call team', status: 'pending' },
    ],
  },
];

export const initialAlerts: Alert[] = [
  {
    id: 'alert-1',
    title: 'High CPU Usage on `auth-service`',
    description: 'CPU utilization has been over 90% for 15 minutes.',
    severity: 'high',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: 'alert-2',
    title: 'Disk Space Low on `logs-prod-01`',
    description: 'Disk usage is at 85%.',
    severity: 'medium',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: 'alert-3',
    title: 'New User Signup Anomaly',
    description: 'Signup rate has dropped by 50% in the last hour.',
    severity: 'low',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
];

export const metricsData = {
  cpu: [
    { time: '12:00', usage: 22 },
    { time: '12:05', usage: 35 },
    { time: '12:10', usage: 45 },
    { time: '12:15', usage: 42 },
    { time: '12:20', usage: 50 },
    { time: '12:25', usage: 55 },
    { time: '12:30', usage: 62 },
  ],
  memory: [
    { name: 'Services', value: 45 },
    { name: 'System', value: 25 },
    { name: 'Cache', value: 30 },
  ],
  network: [
    { time: '12:00', received: 1.2, sent: 2.4 },
    { time: '12:05', received: 1.5, sent: 2.8 },
    { time: '12:10', received: 1.8, sent: 3.1 },
    { time: '12:15', received: 1.6, sent: 2.9 },
    { time: '12:20', received: 2.1, sent: 3.5 },
    { time: '12:25', received: 2.5, sent: 4.0 },
    { time: '12:30', received: 2.2, sent: 3.8 },
  ],
};
