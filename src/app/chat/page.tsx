'use client';

import { useState, useRef, useEffect, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { nanoid } from 'nanoid';
import { User, Bot, CornerDownLeft, Loader } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { submitChatMessage } from '@/lib/actions';
import type { ChatMessage } from '@/lib/firestore-types';
import { cn } from '@/lib/utils';
import { marked } from 'marked';

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
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const [state, formAction, isPending] = useActionState(submitChatMessage, null);

  useEffect(() => {
    if (state?.id && state?.role === 'user') {
      setMessages(prev => [...prev, state]);
    } else if (state?.id && state?.role === 'model') {
       setMessages(prev => {
        const lastMsg = prev[prev.length - 1];
        if (lastMsg.id === state.id) {
            // Update the last message if streaming
            return [...prev.slice(0, -1), state];
        } else {
            // Add a new message if it's a new response
            return [...prev, state];
        }
      });
    }
    // Auto-scroll to the bottom
    window.scrollTo(0, document.body.scrollHeight);
  }, [state]);

  const handleFormAction = (formData: FormData) => {
    formAction(formData);
    formRef.current?.reset();
    inputRef.current?.focus();
  }

  return (
    <div className="flex flex-col h-full">
      <main className="flex-1 space-y-6 pb-20">
        {messages.length === 0 && (
            <Card className="max-w-2xl mx-auto mt-12">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Bot className="w-5 h-5"/> Conversational RCA</CardTitle>
                    <CardDescription>Ask me anything about past incidents or RCA reports.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Examples:</p>
                    <ul className="text-sm list-disc pl-5 mt-2 space-y-1 font-mono text-accent-foreground/80">
                        <li>What went wrong with the DB server last week?</li>
                        <li>Give me a summary of the report for task {'<task-id>'}.</li>
                        <li>Why did the worker VM go offline?</li>
                    </ul>
                </CardContent>
            </Card>
        )}
        {messages.map((msg) => (
          <Message key={msg.id} msg={msg} />
        ))}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur-sm">
         <div className="w-full max-w-2xl mx-auto p-4">
            <form
                ref={formRef}
                action={handleFormAction}
                className="relative flex w-full items-center gap-2"
            >
                <Input
                    ref={inputRef}
                    name="message"
                    placeholder="Ask about a past incident..."
                    className="pr-12"
                    autoComplete="off"
                />
                <div className="absolute right-2">
                    <SubmitButton />
                </div>
            </form>
         </div>
      </footer>
    </div>
  );
}
