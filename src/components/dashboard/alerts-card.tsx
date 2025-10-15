'use client';

import { useTransition } from 'react';
import { AlertTriangle, Bot, CheckCircle, Info } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { type Alert } from '@/lib/data';
import { resolveAlert } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const severityIcons = {
  high: <AlertTriangle className="h-5 w-5 text-red-500" />,
  medium: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
  low: <Info className="h-5 w-5 text-blue-500" />,
};

function ResolveButton({ alertTitle }: { alertTitle: string }) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleClick = () => {
    startTransition(async () => {
      const result = await resolveAlert(alertTitle);
      if (result.success) {
        toast({
          title: 'Action Initiated',
          description: result.message,
          action: <CheckCircle className="h-5 w-5 text-green-500" />,
        });
      } else {
        toast({
          title: 'Action Failed',
          description: result.message,
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <Button size="sm" variant="outline" onClick={handleClick} disabled={isPending}>
      <Bot className={cn('mr-2 h-4 w-4', isPending && 'animate-spin')} />
      {isPending ? 'Resolving...' : 'Resolve with AI'}
    </Button>
  );
}

export function AlertsCard({ alerts }: { alerts: Alert[] }) {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          <CardTitle>Active Alerts</CardTitle>
        </div>
        <CardDescription>
          Critical issues that may require attention.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                {severityIcons[alert.severity]}
                <div>
                  <p className="font-semibold">{alert.title}</p>
                  <p className="text-sm text-muted-foreground">{alert.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
                  </p>
                </div>
              </div>
              <ResolveButton alertTitle={alert.title} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
