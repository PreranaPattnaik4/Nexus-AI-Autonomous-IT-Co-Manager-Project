
'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { CheckCheck, XCircle, BookOpen } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TasksList } from '@/components/dashboard/tasks-list';
import { Skeleton } from '@/components/ui/skeleton';
import { format, subDays } from 'date-fns';
import { allStaticTasks } from '@/components/dashboard/tasks-list';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';


function ReportsList() {
    const loading = false;

    const historicalTasks = useMemo(() => 
        allStaticTasks
            .concat([
                // Adding more diverse static tasks for a richer 30-day log
                { id: 'task-7', goal: 'Migrate legacy database to new cloud instance', status: 'completed', progress: 100, createdAt: subDays(new Date(), 2), steps: [] },
                { id: 'task-8', goal: 'Perform quarterly security audit', status: 'completed', progress: 100, createdAt: subDays(new Date(), 4), steps: [] },
                { id: 'task-9', goal: 'Update firewall rules for new IP range', status: 'failed', progress: 75, createdAt: subDays(new Date(), 7), steps: [] },
                { id: 'task-10', goal: 'Provision a new staging environment for Project Phoenix', status: 'completed', progress: 100, createdAt: subDays(new Date(), 9), steps: [] },
                { id: 'task-11', goal: 'Rotate SSL certificates on all public-facing services', status: 'completed', progress: 100, createdAt: subDays(new Date(), 12), steps: [] },
                { id: 'task-12', goal: 'Test disaster recovery plan', status: 'completed', progress: 100, createdAt: subDays(new Date(), 15), steps: [] },
                { id: 'task-13', goal: 'Decommission old web-server-03', status: 'completed', progress: 100, createdAt: subDays(new Date(), 21), steps: [] },
                { id: 'task-14', goal: 'Update dependencies for the user-service monolith', status: 'failed', progress: 30, createdAt: subDays(new Date(), 25), steps: [] },
                { id: 'task-15', goal: 'Run monthly cost-analysis report', status: 'completed', progress: 100, createdAt: subDays(new Date(), 29), steps: [] }
            ])
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()),
        []
    );

    if (loading) {
        return (
            <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="flex flex-col space-y-2 border-b pb-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/4" />
                </div>
            ))}
            </div>
        );
    }

    return (
         <div className="space-y-2">
            {historicalTasks.map(task => (
                <div key={task.id} className="p-3 border rounded-md flex items-center justify-between">
                    <div className='flex-1'>
                        <p className="font-semibold text-sm">{task.goal}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                            {format(task.createdAt, 'PPP')}
                        </p>
                    </div>
                    <Badge
                        variant={
                            task.status === 'completed'
                            ? 'default'
                            : task.status === 'failed'
                            ? 'destructive'
                            : task.status === 'superseded'
                            ? 'outline'
                            : 'secondary'
                        }
                        className={cn('capitalize w-24 justify-center', task.status === 'completed' && 'bg-green-600' )}
                        >
                        {task.status.replace('-', ' ')}
                    </Badge>
                </div>
            ))}
        </div>
    );
}

export function HistoryTabs() {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') || 'completed';
  
  return (
    <Tabs defaultValue={tab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="completed">
            <CheckCheck className="mr-2 h-4 w-4" />
            Completed
        </TabsTrigger>
        <TabsTrigger value="failed">
            <XCircle className="mr-2 h-4 w-4" />
            Failed
        </TabsTrigger>
        <TabsTrigger value="log">
            <BookOpen className="mr-2 h-4 w-4" />
            30-Day Task Log
        </TabsTrigger>
        </TabsList>
        
        <TabsContent value="completed" className="mt-4">
        <TasksList statusFilter="completed" />
        </TabsContent>

        <TabsContent value="failed" className="mt-4">
        <TasksList statusFilter="failed" />
        </TabsContent>

        <TabsContent value="log" className="mt-4">
        <ReportsList />
        </TabsContent>
    </Tabs>
  );
}
