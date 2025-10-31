
'use client';

import { useState, useRef, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Bot, CornerDownLeft, Loader, Mic, MicOff, User, History } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { ChatMessage } from '@/lib/firestore-types';
import { cn } from '@/lib/utils';
import { marked } from 'marked';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { Logo } from '@/components/icons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, subDays } from 'date-fns';

function SubmitButton({ pending }: { pending: boolean }) {
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

function LiveChat() {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const { toast } = useToast();

  const recognitionRef = useRef<any>(null);

   useEffect(() => {
    if (typeof window !== 'undefined') {
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
                formRef.current?.requestSubmit();
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


  useEffect(() => {
    if (viewportRef.current) {
        viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
    }
  }, [messages]);


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const messageContent = inputValue;
    if(!messageContent.trim()) return;

    const userMessage: ChatMessage = {
        id: nanoid(),
        role: 'user',
        content: messageContent,
        createdAt: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setIsPending(true);

    // Simulate AI response
    setTimeout(() => {
        const aiMessage: ChatMessage = {
            id: nanoid(),
            role: 'model',
            content: `This is a static response for: "${messageContent}". In a real application, this would be a dynamic answer from the AI. For example, there are **3** tasks currently in progress.`,
            createdAt: new Date(),
        };
        setMessages(prev => [...prev, aiMessage]);
        setIsPending(false);
    }, 1500);

    setInputValue(''); 
    inputRef.current?.focus();
  }

  return (
    <div className="flex flex-col h-[calc(100vh-14rem)]">
      {messages.length === 0 && (
         <div className="p-4 text-center space-y-4">
            <div>
                <h3 className="font-semibold">Welcome to the Nexus AI Assistant.</h3>
                <p className="text-sm text-muted-foreground">How can I help you today?</p>
            </div>
            <div>
                <p className="text-sm text-muted-foreground mb-2">Or try one of these examples:</p>
                <ul className="text-sm list-disc pl-5 mt-2 space-y-1 font-mono text-left text-accent-foreground/80">
                    <li>How many tasks are in progress?</li>
                    <li>What is the status of the DB server?</li>
                    <li>Give me a summary of a recent report.</li>
                    <li>Why did the worker VM go offline?</li>
                </ul>
            </div>
        </div>
      )}
      <main className="flex-1 min-h-0">
        <ScrollArea className="h-full" viewportRef={viewportRef}>
            <div className='space-y-6 pb-4 pr-4'>
                {messages.map((msg) => (
                    <Message key={msg.id} msg={msg} />
                ))}
                {isPending && (
                  <div className="flex items-start gap-4">
                    <Avatar className="h-9 w-9 border">
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <div className="max-w-md rounded-lg p-3 bg-muted">
                      <Loader className="h-5 w-5 animate-spin" />
                    </div>
                  </div>
                )}
            </div>
        </ScrollArea>
      </main>
      <footer className="border-t pt-4 shrink-0">
        <form
            ref={formRef}
            onSubmit={handleSubmit}
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
                <SubmitButton pending={isPending} />
            </div>
        </form>
      </footer>
    </div>
  )
}

function ChatHistory() {
    const history = [
        { id: 'chat-1', summary: 'Discussion about the Q3 server maintenance schedule.', lastMessage: 'OK, sounds good. Let\'s proceed.', timestamp: subDays(new Date(), 1) },
        { id: 'chat-2', summary: 'Troubleshooting high CPU usage on the main database.', lastMessage: 'The issue appears to be resolved now.', timestamp: subDays(new Date(), 2) },
        { id: 'chat-3', summary: 'Planning for the upcoming website migration.', lastMessage: 'I will prepare the initial migration script.', timestamp: subDays(new Date(), 5) },
    ];
    return (
        <ScrollArea className="h-[calc(100vh-14rem)]">
            <div className="space-y-4">
                {history.map(chat => (
                    <Button variant="outline" className="w-full h-auto justify-start p-4" key={chat.id}>
                        <div className="flex items-start gap-4 text-left">
                            <Avatar className="h-9 w-9 border">
                                <AvatarFallback>AI</AvatarFallback>
                            </Avatar>
                            <div className='flex-1'>
                                <p className="font-semibold text-sm truncate">{chat.summary}</p>
                                <p className="text-xs text-muted-foreground mt-1 truncate">{chat.lastMessage}</p>
                                <p className="text-xs text-muted-foreground mt-2">{format(chat.timestamp, 'PPP')}</p>
                            </div>
                        </div>
                    </Button>
                ))}
            </div>
        </ScrollArea>
    )
}

export default function ChatPage() {
  return (
    <Card className='h-[calc(100vh-8rem)] flex flex-col'>
      <CardHeader>
        <div className='flex items-center gap-2'>
          <div className="bg-primary text-primary-foreground p-1 rounded-md">
              <Logo className="h-6 w-6" />
          </div>
          <div>
            <CardTitle>Nexus AI</CardTitle>
            <CardDescription>Autonomous IT Co-Manager</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col min-h-0">
        <Tabs defaultValue="chat" className="w-full flex-1 flex flex-col min-h-0">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chat">Live Chat</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          <TabsContent value="chat" className="flex-1 mt-4">
            <LiveChat />
          </TabsContent>
          <TabsContent value="history" className="flex-1 mt-4">
            <ChatHistory />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
