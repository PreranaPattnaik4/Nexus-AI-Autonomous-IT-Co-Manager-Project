'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Logo } from '@/components/icons';
import { useToast } from '@/hooks/use-toast';
import { Loader } from 'lucide-react';

export default function ContactPage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            toast({
                title: "Message Sent (Mock)",
                description: "Thank you for your inquiry! We've received your message and will get back to you shortly.",
            });
            // In a real app, you might want to close the dialog here.
            // For now, we'll just clear the form.
            (e.target as HTMLFormElement).reset();
        }, 1500);
    };


  return (
    <Card className="border-none shadow-none">
        <CardHeader className="text-center">
            <div className="flex justify-center items-center gap-2 mb-2">
                <Logo className="h-8 w-8 text-primary" />
            </div>
            <CardTitle>Welcome to Nexus AI</CardTitle>
            <CardDescription>
                We'd love to hear from you. Please fill out the form below.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Enter your name" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="Enter your email" required />
                    </div>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="What is your message about?" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Please describe your inquiry..." rows={3} required />
                </div>
                <div className="flex justify-end">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                        {isLoading ? 'Submitting...' : 'Submit Inquiry'}
                    </Button>
                </div>
            </form>
        </CardContent>
    </Card>
  );
}
