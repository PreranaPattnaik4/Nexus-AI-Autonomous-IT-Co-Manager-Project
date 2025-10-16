'use client';

import { useState, useTransition } from 'react';
import { FileText, CheckCircle2, XCircle, Loader, ChevronDown, ChevronUp, Bot } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { RcaReportDialog } from './rca-report-dialog';
import { Task } from '@/lib/firestore-types';
import { retryTask } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { CardTitle } from '../ui/card';

const statusIcons = {
  'in-progress': <Loader className="h-4 w-4 animate-spin text-blue-500" />,
  completed: <CheckCircle2 className="h-4 w-4 text-green-500" />,
  failed: <XCircle className="h-4 w-4 text-red-500" />,
};

const stepStatusIcons = {
  pending: <Loader className="h-3 w-3 animate-spin text-muted-foreground" />,
  completed: <CheckCircle2 className="h-3 w-3 text-green-500" />,
  failed: <XCircle className="h-3 w-3 text-red-500" />,
};

function StepLog({ log }: { log: string }) {
    return (
        <div className="mt-1 text-xs text-muted-foreground pl-5 border-l border-dashed border-border ml-1.5 font-code bg-muted/50 p-2 rounded-md">
            {log}
        </div>
    );
}

function RetryButton({ taskId }: { taskId: string }) {
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    const handleRetry = () => {
        startTransition(async () => {
            const result = await retryTask(taskId);
            if (result.success) {
                toast({
                    title: 'Task Retry Initiated',
                    description: result.message,
                });
            } else {
                toast({
                    title: 'Retry Failed',
                    description: result.message,
                    variant: 'destructive',
                });
            }
        });
    };

    return (
        <Button variant="outline" size="sm" onClick={handleRetry} disabled={isPending}>
            <Bot className={cn('mr-2 h-4 w-4', isPending && 'animate-spin')} />
            {isPending ? 'Retrying...' : 'Retry with AI'}
        </Button>
    );
}

export function TaskItem({ task }: { task: Task }) {
  const [isOpen, setIsOpen] = useState(false);
  const statusIcon = statusIcons[task.status];
  const isFinished = task.status === 'completed' || task.status === 'failed';

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
            <CardTitle className="text-base font-medium truncate pr-4">{task.goal}</CardTitle>
          <div className="flex items-center space-x-2 flex-shrink-0">
            {statusIcon}
            <Badge
              variant={
                task.status === 'completed'
                  ? 'default'
                  : task.status === 'failed'
                  ? 'destructive'
                  : 'secondary'
              }
              className={cn('capitalize', task.status === 'completed' && 'bg-green-600' )}
            >
              {task.status.replace('-', ' ')}
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-4">
            <Progress value={task.progress} className="h-2 flex-1" />
            <span className="text-xs font-medium text-muted-foreground w-10 text-right">{task.progress}%</span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                <span className="ml-2">Details</span>
              </Button>
            </CollapsibleTrigger>
            {isFinished && task.id && <RcaReportDialog taskId={task.id} />}
          </div>
          {task.status === 'failed' && <RetryButton taskId={task.id} />}
        </div>
      </div>
      <CollapsibleContent className="mt-4 space-y-3 pl-4">
        {task.steps.map((step, index) => (
          <div key={index}>
            <div className="flex items-center text-sm">
              {stepStatusIcons[step.status]}
              <span className={cn('ml-2', step.status === 'pending' && 'text-muted-foreground')}>{step.description}</span>
            </div>
            {step.log && <StepLog log={step.log} />}
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
