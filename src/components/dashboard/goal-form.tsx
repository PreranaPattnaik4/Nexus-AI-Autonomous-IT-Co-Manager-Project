'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { ArrowRight } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { submitGoal, type GoalFormState } from '@/lib/actions';
import { useRouter } from 'next/navigation';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Generating...' : 'Create Task'}
      <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  );
}

const initialState: GoalFormState = {
  message: '',
};

export function GoalForm() {
  const [state, formAction] = useActionState(submitGoal, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (state.message.includes('Successfully')) {
      toast({
        title: 'Success',
        description: state.message,
      });
      formRef.current?.reset();
      router.refresh(); // Re-fetch server data and re-render
    } else if (state.message) {
      toast({
        title: 'Error',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, toast, router]);

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Goal-Based Task Management</CardTitle>
        <CardDescription>
          Submit a high-level goal in natural language. Nexus AI will create an actionable plan.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={formAction} className="space-y-4">
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
            {state.errors?.goal && (
              <p className="text-sm font-medium text-destructive">
                {state.errors.goal.join(', ')}
              </p>
            )}
          </div>
          <div className="flex justify-start">
            <SubmitButton />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
