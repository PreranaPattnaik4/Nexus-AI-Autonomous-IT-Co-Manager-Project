import { ListChecks } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { initialTasks, type Task } from '@/lib/data';
import { TaskItem } from './task-item';

export async function TasksList() {
  // In a real app, you would fetch this from your database.
  const tasks: Task[] = initialTasks;

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
          <div className="space-y-6 pr-6">
            {tasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
