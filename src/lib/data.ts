import { System, Alert, Task, Step } from '@/lib/firestore-types';
import { Timestamp } from 'firebase/firestore';

export const initialSystems: Omit<System, 'id'>[] = [
    {
        name: 'Web Server 1',
        status: 'online',
        cpuUsage: 34,
        memoryUsage: 58
    },
    {
        name: 'DB Server',
        status: 'online',
        cpuUsage: 22,
        memoryUsage: 76
    },
    {
        name: 'Cache Server',
        status: 'degraded',
        cpuUsage: 89,
        memoryUsage: 45
    }
];

export const initialAlerts: Omit<Alert, 'id' | 'timestamp'>[] = [
    {
        title: 'High CPU on Web Server 1',
        description: 'CPU usage has exceeded 80% for the last 5 minutes.',
        severity: 'high',
    },
    {
        title: 'DB Server Slow Queries',
        description: 'Multiple slow queries detected on the main database.',
        severity: 'medium',
    },
    {
        title: 'Low disk space on Backup Server',
        description: 'Disk space is below 10%.',
        severity: 'low',
    }
];
