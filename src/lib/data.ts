import { System, Alert } from '@/lib/firestore-types';

export const initialSystems: Omit<System, 'id'>[] = [
    {
        name: 'Web Server 1',
        status: 'online',
        cpuUsage: 34,
        memoryUsage: 58
    },
    {
        name: 'Web Server 2',
        status: 'online',
        cpuUsage: 45,
        memoryUsage: 60
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
    },
    {
        name: 'Worker VM 1',
        status: 'offline',
        cpuUsage: 0,
        memoryUsage: 0
    }
];

export const initialAlerts: Omit<Alert, 'id' | 'timestamp'>[] = [
    {
        title: 'High CPU on Cache Server',
        description: 'CPU usage has exceeded 85% for the last 10 minutes.',
        severity: 'high',
    },
    {
        title: 'Predictive Alert: CPU Overload Risk',
        description: 'CPU usage trend on Web Server 2 indicates potential overload in the next 2 hours.',
        severity: 'medium',
    },
    {
        title: 'DB Server Slow Queries',
        description: 'Multiple slow queries detected on the main database.',
        severity: 'medium',
    },
    {
        title: 'Worker VM 1 is Offline',
        description: 'The worker VM is not responding to pings.',
        severity: 'high',
    },
    {
        title: 'Low disk space on Backup Server',
        description: 'Disk space is below 10%.',
        severity: 'low',
    }
];
