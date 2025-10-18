'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/firebase';
import { initiateEmailSignUp, initiateEmailSignIn } from '@/firebase/non-blocking-login';
import { useToast } from '@/hooks/use-toast';

export function LoginDialog() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const { toast } = useToast();

  const handleAuthAction = async (action: 'signin' | 'signup') => {
    setLoading(true);
    try {
      if (action === 'signup') {
        initiateEmailSignUp(auth, email, password);
        toast({ title: 'Signup initiated', description: 'Please check your email to verify your account.' });
      } else {
        initiateEmailSignIn(auth, email, password);
        toast({ title: 'Sign in initiated' });
      }
      setOpen(false);
    } catch (error: any) {
      toast({
        title: 'Authentication Failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Login / Sign Up</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Welcome to Nexus AI</DialogTitle>
          <DialogDescription>Sign in or create an account to continue.</DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="signin">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin">
            <div className="space-y-4 py-2 pt-6">
              <div className="space-y-2">
                <Label htmlFor="email-signin">Email</Label>
                <Input id="email-signin" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-signin">Password</Label>
                <Input id="password-signin" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <Button onClick={() => handleAuthAction('signin')} className="w-full" disabled={loading}>
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="signup">
            <div className="space-y-4 py-2 pt-6">
              <div className="space-y-2">
                <Label htmlFor="email-signup">Email</Label>
                <Input id="email-signup" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-signup">Password</Label>
                <Input id="password-signup" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <Button onClick={() => handleAuthAction('signup')} className="w-full" disabled={loading}>
                {loading ? 'Signing Up...' : 'Sign Up'}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
