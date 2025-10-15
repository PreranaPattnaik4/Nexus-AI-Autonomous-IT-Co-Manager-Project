'use client';

import { ListChecks } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useCollection } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { TaskItem } from './task-item';
import { Task } from '@/lib/firestore-types';
import { Skeleton } from '@/components/ui/skeleton';

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


export function TasksList() {
  const firestore = useFirestore();
  const tasksQuery = firestore ? query(collection(firestore, 'tasks'), orderBy('createdAt', 'desc')) : null;
  const { data: tasks, loading } = useCollection<Task>(tasksQuery);

  return (
    <Card className="col-span-1 lg:col-span-3">
      <CardHeader>
        <div className="flex items-center gap-2">
          <ListChecks className="h-5 w-5" />
          <CardTitle>Active Tasks</CardTitle>
        </div>
        <CardDescription>
          An overview of the agent's current and recent tasks.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          {loading ? (
             <TasksListSkeleton />
          ) : (
            <div className="space-y-6 pr-6">
              {tasks?.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
