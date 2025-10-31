
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Settings, Bot } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

export default function ProfilePage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
  }, []);

  const handleThemeChange = (checked: boolean) => {
    setIsDarkMode(checked);
    if (checked) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleRestoreDefaults = () => {
    toast({
      title: "Settings Restored (Mock)",
      description: "AI tool settings have been restored to their default values.",
    });
    // Here you would typically reset state to default values
  };

  return (
    <div className="space-y-6">
       <Card>
        <CardHeader>
            <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <CardTitle>Profile</CardTitle>
            </div>
            <CardDescription>Update your personal information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="https://picsum.photos/seed/user/64/64" alt="User" data-ai-hint="person avatar" />
              <AvatarFallback>IT</AvatarFallback>
            </Avatar>
            <Button variant="outline">Change Photo</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="IT Manager" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="manager@example.com" disabled />
            </div>
          </div>
        </CardContent>
        <CardFooter className='justify-end'>
            <Button>Save Changes</Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            <CardTitle>Theme</CardTitle>
          </div>
          <CardDescription>Customize the appearance of the application.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <Label htmlFor="dark-mode">Dark Mode</Label>
            <Switch id="dark-mode" checked={isDarkMode} onCheckedChange={handleThemeChange} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            <CardTitle>Nexus AI Tools Settings</CardTitle>
          </div>
          <CardDescription>Manage and configure the platform's AI capabilities.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg border">
            <div>
                <Label htmlFor="proactive-resolution" className='font-medium'>Proactive Issue Resolution</Label>
                <p className='text-xs text-muted-foreground'>Allow AI to autonomously resolve detected issues.</p>
            </div>
            <Switch id="proactive-resolution" defaultChecked />
          </div>
           <div className="flex items-center justify-between p-3 rounded-lg border">
            <div>
                <Label htmlFor="ai-insights" className='font-medium'>AI-Generated Insights</Label>
                <p className='text-xs text-muted-foreground'>Enable weekly performance and optimization insights.</p>
            </div>
            <Switch id="ai-insights" defaultChecked />
          </div>
           <div className="flex items-center justify-between p-3 rounded-lg border">
            <div>
                <Label htmlFor="slack-notifications" className='font-medium'>Slack Notifications</Label>
                <p className='text-xs text-muted-foreground'>Send real-time alerts and reports to connected Slack channels.</p>
            </div>
            <Switch id="slack-notifications" />
          </div>
        </CardContent>
        <CardFooter className="justify-between">
            <Button variant="outline" onClick={handleRestoreDefaults}>Restore Defaults</Button>
            <Button>Save Settings</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
