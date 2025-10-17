'use client';

import { useState, useRef, useEffect, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { nanoid } from 'nanoid';
import { User, Bot, CornerDownLeft, Loader } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { submitChatMessage } from '@/lib/actions';
import type { ChatMessage } from '@/lib/firestore-types';
import { cn } from '@/lib/utils';
import { marked } from 'marked';
import { ScrollArea } from '@/components/ui/scroll-area';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="icon" disabled={pending}>
      {pending ? <Loader className="h-4 w-4 animate-spin" /> : <CornerDownLeft className="h-4 w-4" />}
      <span className="sr-only">Send message</span>
    </Button>
  );
}

function Message({ msg }: { msg: ChatMessage }) {
  const isUser = msg.role === 'user';
  return (
    <div className={cn('flex items-start gap-4', isUser && 'justify-end')}>
      {!isUser && (
        <Avatar className="h-9 w-9 border">
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          'max-w-md rounded-lg p-3',
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted'
        )}
      >
        {msg.role === 'model' ? (
             <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: marked.parse(msg.content) as string }} />
        ) : (
            <p className="text-sm">{msg.content}</p>
        )}
       
      </div>
      {isUser && (
        <Avatar className="h-9 w-9 border">
          <AvatarFallback>IT</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}

export default function ChatPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const [state, formAction] = useActionState(submitChatMessage, null);

  useEffect(() => {
    if (state?.id && state?.role === 'user') {
      setMessages(prev => [...prev, state]);
    } else if (state?.id && state?.role === 'model') {
       setMessages(prev => {
        // Check if the last message has the same role. If so, update it.
        const lastMsg = prev[prev.length - 1];
        if (lastMsg.role === 'model') {
            return [...prev.slice(0, -1), state];
        }
        return [...prev, state];
      });
    }
  }, [state]);

  useEffect(() => {
    if (scrollAreaRef.current) {
        const scrollContainer = scrollAreaRef.current.querySelector('div:first-child') as HTMLDivElement;
        if(scrollContainer) {
            scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }
    }
  }, [messages]);


  const handleFormAction = (formData: FormData) => {
    const messageContent = formData.get('message') as string;
    if(!messageContent.trim()) return;

    const userMessage: ChatMessage = {
        id: nanoid(),
        role: 'user',
        content: messageContent,
        createdAt: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);

    formAction(formData);
    formRef.current?.reset();
    inputRef.current?.focus();
  }

  return (
    <div className="flex flex-col h-[calc(100vh-14rem)]">
      <header className='mb-4'>
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Bot className="w-5 h-5"/> System Health Assistant</CardTitle>
                <CardDescription>Ask me anything about system health, tasks, alerts, or past incidents.</CardDescription>
            </CardHeader>
             {messages.length === 0 && (
                 <CardContent>
                    <p className="text-sm text-muted-foreground">Examples:</p>
                    <ul className="text-sm list-disc pl-5 mt-2 space-y-1 font-mono text-accent-foreground/80">
                        <li>How many tasks are in progress?</li>
                        <li>What is the status of the DB server?</li>
                        <li>Give me a summary of the report for task {'<task-id>'}.</li>
                        <li>Why did the worker VM go offline?</li>
                    </ul>
                </CardContent>
            )}
        </Card>
      </header>

      <main className="flex-1">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
            <div className='space-y-6 pb-4 pr-4'>
                {messages.map((msg) => (
                    <Message key={msg.id} msg={msg} />
                ))}
            </div>
        </ScrollArea>
      </main>

      <footer className="border-t pt-4">
            <form
                ref={formRef}
                action={handleFormAction}
                className="relative flex w-full items-center gap-2"
            >
                <Input
                    ref={inputRef}
                    name="message"
                    placeholder="Ask about system health..."
                    className="pr-12"
                    autoComplete="off"
                />
                <div className="absolute right-2">
                    <SubmitButton />
                </div>
            </form>
      </footer>
    </div>
  );
}
