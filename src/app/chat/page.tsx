'use client';

import { useState, useRef, useEffect, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { nanoid } from 'nanoid';
import { User, Bot, CornerDownLeft, Loader, Mic, MicOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { submitChatMessage } from '@/lib/actions';
import type { ChatMessage } from '@/lib/firestore-types';
import { cn } from '@/lib/utils';
import { marked } from 'marked';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';


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
  const audioRef = useRef<HTMLAudioElement>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const { toast } = useToast();

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => {
        setIsRecording(true);
      };
      
      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        // Automatically submit the form with the transcript
        if(formRef.current) {
            const formData = new FormData(formRef.current);
            formData.set('message', transcript);
            handleFormAction(formData);
        }
      };
      
      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsRecording(false);
        toast({
            variant: 'destructive',
            title: 'Voice Recognition Error',
            description: `An error occurred: ${event.error}. Please try again.`
        })
      };

    } else {
        console.warn('Speech recognition not supported in this browser.');
    }
  }, [toast]);

  const handleMicClick = () => {
    if (!recognitionRef.current) {
        toast({
            variant: 'destructive',
            title: 'Unsupported Feature',
            description: 'Your browser does not support voice recognition.'
        });
        return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };


  const [state, formAction] = useActionState(submitChatMessage, null);

  useEffect(() => {
    if (state?.message) {
      setMessages(prev => {
        const lastMsg = prev[prev.length - 1];
        // Replace the optimistic user message if it exists
        if (lastMsg.role === 'user' && state.message.role === 'user') {
            return [...prev.slice(0, -1), state.message];
        }
        // If the last message was a model response, update it (for streaming)
        if (lastMsg.role === 'model' && state.message.role === 'model') {
            return [...prev.slice(0, -1), state.message];
        }
        // Otherwise, add the new message
        return [...prev, state.message];
      });

      if (state.audio && audioRef.current) {
        audioRef.current.src = state.audio;
        audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
      }
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
    setInputValue(''); // Reset our controlled input state
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
                    placeholder={isRecording ? "Listening..." : "Ask about system health..."}
                    className="pr-24"
                    autoComplete="off"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <div className="absolute right-12">
                   <Button type="button" size="icon" variant="ghost" onClick={handleMicClick}>
                        {isRecording ? <MicOff className="h-4 w-4 text-red-500" /> : <Mic className="h-4 w-4" />}
                        <span className="sr-only">{isRecording ? 'Stop recording' : 'Start recording'}</span>
                    </Button>
                </div>
                <div className="absolute right-2">
                    <SubmitButton />
                </div>
            </form>
            <audio ref={audioRef} className="hidden" />
      </footer>
    </div>
  );
}
