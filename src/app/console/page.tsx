
'use client';

import { useState, useRef, useEffect } from 'react';
import { ArrowRight, ChevronRight, Loader, Terminal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { CommandSimulationResult } from '@/lib/firestore-types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { nanoid } from 'nanoid';

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <Button type="submit" size="icon" variant="secondary" disabled={pending}>
      {pending ? <Loader className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
      <span className="sr-only">Submit command</span>
    </Button>
  );
}

function CommandEntry({ result }: { result: CommandSimulationResult }) {
  return (
    <div className="font-mono text-sm">
      <div className="flex items-center gap-2">
        <ChevronRight className="h-4 w-4 text-green-400" />
        <span className="text-muted-foreground">{result.command}</span>
      </div>
      <div 
        className="whitespace-pre-wrap pl-6 pt-1 text-accent-foreground/90"
      >
        {result.output}
      </div>
    </div>
  );
}


export default function ConsolePage() {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [history, setHistory] = useState<CommandSimulationResult[]>([]);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (viewportRef.current) {
        viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const command = formData.get('command') as string;
    if(!command.trim()) return;
    
    setIsPending(true);

    const commandEntry: CommandSimulationResult = {
      id: nanoid(),
      command,
      output: '',
      timestamp: new Date(),
    };

    setHistory(prev => [...prev, commandEntry]);
    
    setTimeout(() => {
      const simulatedOutput = `> Simulating output for: ${command}\n> This is a static response. In a real application, the AI would generate a realistic output.\n> For example, for 'ls -la', it might show file listings.`;

      setHistory(prev => prev.map(h => 
        h.id === commandEntry.id ? { ...h, output: simulatedOutput } : h
      ));
      setIsPending(false);
      formRef.current?.reset();
      inputRef.current?.focus();
    }, 1000);
  };

  return (
    <Card className="h-[calc(100vh-10rem)] flex flex-col font-mono">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Terminal className="h-5 w-5" />
          <CardTitle>Demo Command Console</CardTitle>
        </div>
        <CardDescription className='font-sans'>
          Interact with a simulated AI assistant. Enter a command and see the static output.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col min-h-0">
        <ScrollArea className="flex-1 -mr-6" viewportRef={viewportRef}>
            <div className='space-y-6 pr-6'>
                 {history.length === 0 && (
                    <div className="p-4 text-left">
                        <p className="text-sm text-muted-foreground font-sans">Examples:</p>
                        <ul className="text-sm list-disc pl-5 mt-2 space-y-1 text-accent-foreground/80">
                            <li>kubectl get pods --namespace=production</li>
                            <li>docker ps</li>
                            <li>git status</li>
                            <li>check server uptime</li>
                        </ul>
                    </div>
                )}
                {history.map((result) => (
                    <CommandEntry key={result.id} result={result} />
                ))}
            </div>
        </ScrollArea>

        <div className="border-t pt-4 mt-4">
            <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="relative flex w-full items-center gap-2"
            >
                <ChevronRight className="h-5 w-5 text-green-400 absolute left-2" />
                <Input
                    ref={inputRef}
                    name="command"
                    placeholder="Enter a command..."
                    className="pl-8 pr-12 bg-background/80 font-mono text-sm"
                    autoComplete="off"
                    disabled={isPending}
                />
                <div className="absolute right-2">
                    <SubmitButton pending={isPending} />
                </div>
            </form>
        </div>
      </CardContent>
    </Card>
  );
}
