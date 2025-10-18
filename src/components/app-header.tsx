
'use client';

import { Search, Bell, AlertTriangle, Info, User } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LoginDialog } from './auth/login-dialog';
import { initialAlerts } from '@/lib/data';
import { Badge } from '@/components/ui/badge';

const severityIcons: { [key: string]: React.ReactNode } = {
  high: <AlertTriangle className="h-4 w-4 text-red-500" />,
  medium: <AlertTriangle className="h-4 w-4 text-yellow-500" />,
  low: <Info className="h-4 w-4 text-blue-500" />,
};

export function AppHeader() {
  const user = {
    displayName: 'IT Manager',
    email: 'manager@example.com',
    photoURL: 'https://picsum.photos/seed/user/40/40',
  };
  const isUserLoading = false;
  const notifications = initialAlerts;

  return (
    <header className="flex h-16 items-center border-b bg-card px-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search tasks, reports, or systems..."
          className="pl-10 w-full max-w-md"
        />
      </div>
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
              {notifications.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 justify-center rounded-full p-0 text-xs">
                  {notifications.length}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80" align="end">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.length > 0 ? (
              notifications.map((alert, index) => (
                <DropdownMenuItem
                  key={index}
                  className="flex items-start gap-3"
                >
                  {severityIcons[alert.severity]}
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-none">
                      {alert.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {alert.description}
                    </p>
                  </div>
                </DropdownMenuItem>
              ))
            ) : (
              <p className="p-4 text-sm text-center text-muted-foreground">
                No new notifications.
              </p>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {isUserLoading ? (
          <Avatar className="h-9 w-9 animate-pulse bg-muted" />
        ) : user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-9 w-9 rounded-full"
              >
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src={user.photoURL || ''}
                    alt={user.displayName || 'User'}
                    data-ai-hint="person avatar"
                  />
                  <AvatarFallback>
                    {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user.displayName || 'Nexus User'}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <LoginDialog />
        )}
      </div>
    </header>
  );
}
