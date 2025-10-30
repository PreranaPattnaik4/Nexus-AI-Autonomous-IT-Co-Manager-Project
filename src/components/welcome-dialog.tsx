'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Logo } from './icons';
import { useAuth } from './auth/auth-provider';
import { ListChecks, Bot, Zap, MessageCircle } from 'lucide-react';
import { LoginDialog } from './auth/login-dialog';

const features = [
    {
        icon: Bot,
        title: "Goal-Based Task Management",
        description: "Give the agent natural language goals and watch it create and execute a plan."
    },
    {
        icon: ListChecks,
        title: "Proactive Issue Resolution",
        description: "Identifies and fixes problems autonomously without waiting for human intervention."
    },
    {
        icon: MessageCircle,
        title: "Conversational AI with Voice",
        description: "Interact with the system using natural language, including voice commands and audio responses."
    },
    {
        icon: Zap,
        title: "Third-Party Integrations",
        description: "Seamlessly connects with your existing IT tools like Jira, Slack, and monitoring systems."
    }
];

export function WelcomeDialog() {
  const { user, isUserLoading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isUserLoading && !user) {
      const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcome');
      if (!hasSeenWelcome) {
        setIsOpen(true);
        sessionStorage.setItem('hasSeenWelcome', 'true');
      }
    } else if (user) {
      setIsOpen(false);
    }
  }, [user, isUserLoading]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent 
        className="sm:max-w-2xl"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="text-center items-center">
             <div className="flex justify-center items-center gap-2 mb-2">
                <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                    <Logo className="h-8 w-8" />
                </div>
            </div>
          <DialogTitle className="text-2xl">Welcome to Nexus AI</DialogTitle>
          <DialogDescription>Your Autonomous IT Co-Manager</DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
            <p className='text-center text-muted-foreground text-sm'>Nexus is a proactive Agentic AI solution that redefines IT operations by moving beyond simple automation to create a truly autonomous, intelligent partner.</p>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {features.map((feature) => {
                    const Icon = feature.icon;
                    return (
                         <div key={feature.title} className="flex items-start gap-3 p-3 rounded-lg border bg-card/30">
                            <div className="bg-secondary text-secondary-foreground p-2 rounded-md">
                                <Icon className="h-5 w-5" />
                            </div>
                            <div>
                                <h4 className='font-semibold text-sm'>{feature.title}</h4>
                                <p className='text-xs text-muted-foreground mt-1'>{feature.description}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
        <div className="flex justify-center">
            <LoginDialog />
        </div>
      </DialogContent>
    </Dialog>
  );
}
