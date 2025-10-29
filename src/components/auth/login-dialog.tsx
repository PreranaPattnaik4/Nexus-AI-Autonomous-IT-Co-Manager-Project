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
import { useToast } from '@/hooks/use-toast';
import { useAuth } from './auth-provider';
import { Chrome } from 'lucide-react';
import { cn } from '@/lib/utils';

export function LoginDialog({ open: controlledOpen, onOpenChange: setControlledOpen }: { open?: boolean; onOpenChange?: (open: boolean) => void; }) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const { toast } = useToast();
  const { login } = useAuth();
  
  const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;
  const setOpen = setControlledOpen !== undefined ? setControlledOpen : setUncontrolledOpen;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleAuthAction = async (action: 'signin' | 'signup' | 'google') => {
    setLoading(true);
    // This is a mock function now.
    setTimeout(() => {
      let title = 'Authentication Succeeded (Mock)';
      if (action === 'google') title = 'Signed in with Google (Mock)';
      else if(action === 'signup') title = 'Sign Up Succeeded (Mock)';

      toast({
        title,
        description: 'This is a static frontend. No actual authentication occurred.',
      });
      login({ displayName: 'IT Manager', email: 'manager@example.com' });
      setLoading(false);
      setOpen(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Login / Sign Up</Button>
      </DialogTrigger>
      <DialogContent 
        className={cn(
            "sm:max-w-md w-full",
            // For the initial welcome screen, make it larger
            !controlledOpen && "sm:max-w-3xl md:w-1/2"
        )}
        onInteractOutside={(e) => {
            // Prevent closing the initial dialog by clicking outside
            if (open && !controlledOpen) {
                e.preventDefault();
            }
        }}
      >
        <DialogHeader>
          <DialogTitle>Welcome to Nexus AI</DialogTitle>
          <DialogDescription>Sign in or create an account to continue. (This is a mock dialog)</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
            <Button variant="outline" className="w-full" onClick={() => handleAuthAction('google')} disabled={loading}>
                <Chrome className="mr-2 h-4 w-4" /> Sign in with Google
            </Button>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
            </div>
        </div>

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
