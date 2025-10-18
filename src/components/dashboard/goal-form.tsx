'use client';

import { useState, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Generating...' : 'Create Task'}
      <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  );
}

export function GoalForm() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const goal = formData.get('goal') as string;

    if (!goal || goal.trim().length < 10) {
      setError('Goal must be at least 10 characters long.');
      return;
    }
    setError(null);
    setPending(true);

    // Simulate backend call
    setTimeout(() => {
      toast({
        title: 'Success (Mock)',
        description: 'Successfully created task. Agent is starting execution...',
      });
      formRef.current?.reset();
      setPending(false);
      // In a real app, you might want to add the task to a local state
      // For this demo, we'll just refresh to show it's a static view
      router.refresh(); 
    }, 1500);
  };

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Goal-Based Task Management</CardTitle>
        <CardDescription>
          Submit a high-level goal in natural language. Nexus AI will create an actionable plan.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="goal">Your Goal</Label>
            <Textarea
              id="goal"
              name="goal"
              placeholder="e.g., 'Ensure all production servers are patched' or 'Onboard new developer to the project-x repository'"
              rows={4}
              required
              className="font-code"
            />
            {error && (
              <p className="text-sm font-medium text-destructive">
                {error}
              </p>
            )}
          </div>
          <div className="flex justify-start">
            <SubmitButton pending={pending} />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
