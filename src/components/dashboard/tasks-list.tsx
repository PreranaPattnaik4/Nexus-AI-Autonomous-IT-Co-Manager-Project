'use client';

import { ListChecks, CheckCheck, XCircle, Loader } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useCollection } from '@/firebase';
import { collection, query, where, orderBy } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { TaskItem } from './task-item';
import { Task } from '@/lib/firestore-types';
import { Skeleton } from '@/components/ui/skeleton';
import { useMemo } from 'react';

function TasksListSkeleton() {
  return (
    <div className="space-y-6 pr-6">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-2 flex-1" />
            <Skeleton className="h-4 w-10" />
          </div>
        </div>
      ))}
    </div>
  );
}

const pageConfig = {
  all: {
    icon: <ListChecks className="h-5 w-5" />,
    title: 'All Tasks',
    description: "An overview of all the agent's tasks.",
  },
  'in-progress': {
    icon: <Loader className="h-5 w-5 animate-spin" />,
    title: 'In Progress Tasks',
    description: "Tasks the agent is currently working on.",
  },
  completed: {
    icon: <CheckCheck className="h-5 w-5" />,
    title: 'Completed Tasks',
    description: 'A history of all tasks successfully completed by the agent.',
  },
  failed: {
    icon: <XCircle className="h-5 w-5" />,
    title: 'Failed Tasks',
    description: 'Tasks that failed during execution.',
  },
};


export function TasksList({ statusFilter }: { statusFilter?: 'in-progress' | 'completed' | 'failed' }) {
  const firestore = useFirestore();
  
  const tasksQuery = useMemo(() => {
    if (!firestore) return null;
    const baseQuery = collection(firestore, 'tasks');
    if (statusFilter) {
      return query(baseQuery, where('status', '==', statusFilter), orderBy('createdAt', 'desc'));
    }
    return query(baseQuery, orderBy('createdAt', 'desc'));
  }, [firestore, statusFilter]);

  const { data: tasks, loading } = useCollection<Task>(tasksQuery);
  const { icon, title, description } = pageConfig[statusFilter || 'all'];

  return (
    <Card className="col-span-1 lg:col-span-3">
      <CardHeader>
        <div className="flex items-center gap-2">
          {icon}
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[75vh]">
          {loading ? (
             <TasksListSkeleton />
          ) : (
            <div className="space-y-6 pr-6">
              {tasks && tasks.length > 0 ? (
                tasks.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))
              ) : (
                <p className="text-muted-foreground text-center py-8">No tasks found for this filter.</p>
              )}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
