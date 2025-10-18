'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  LayoutDashboard,
  ListChecks,
  FileText,
  Settings,
  CircleHelp,
  Zap,
  CheckCheck,
  XCircle,
  Loader,
  MessageCircle,
  Terminal,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Logo } from './icons';

const navItems = [
  { href: '/chat', label: 'Chat', icon: MessageCircle },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/console', label: 'Command Console', icon: Terminal },
  { href: '/tasks', label: 'All Tasks', icon: ListChecks },
  { href: '/tasks?status=in-progress', label: 'In Progress', icon: Loader },
  { href: '/tasks?status=completed', label: 'Completed', icon: CheckCheck },
  { href: '/tasks?status=failed', label: 'Failed', icon: XCircle },
  { href: '/reports', label: 'Reports', icon: FileText },
  { href: '/integrations', label: 'Integrations', icon: Zap },
  { href: '/settings', label: 'Settings', icon: Settings },
];

function NavItems() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const status = searchParams.get('status');
  const currentPath = status ? `${pathname}?status=${status}` : pathname;

  return (
    <>
      {navItems.map((item) => {
        const isActive = item.href === currentPath;
        
        return (
          <Button
            key={item.href}
            variant={isActive ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            asChild
          >
            <Link href={item.href}>
              <item.icon className={cn("mr-2 h-4 w-4", item.label === 'In Progress' && 'animate-spin')} />
              {item.label}
            </Link>
          </Button>
        )
      })}
    </>
  );
}


export function AppSidebar() {
  const user = {
    displayName: 'IT Manager',
    email: 'manager@example.com',
    photoURL: 'https://picsum.photos/seed/user/40/40'
  };

  return (
    <aside className="h-screen w-64 flex-shrink-0 flex flex-col bg-card border-r">
      <div className="flex items-center justify-center h-16 border-b">
        <Logo className="h-6 w-6 text-primary" />
        <h1 className="ml-2 text-xl font-bold tracking-tight">Nexus AI</h1>
      </div>
      <nav className="flex-1 px-4 py-4 space-y-2">
        <NavItems />
      </nav>
      <div className="mt-auto p-4 border-t">
        <Button variant="ghost" className="w-full justify-start mb-4">
          <CircleHelp className="mr-2 h-4 w-4" />
          Help & Support
        </Button>
        <div className="flex items-center">
           {user ? (
            <>
                <Avatar className="h-9 w-9">
                    <AvatarImage src={user.photoURL} alt={user.displayName || 'User'} />
                    <AvatarFallback>{user.displayName?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
                <div className="ml-3">
                    <p className="text-sm font-medium">{user.displayName}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
            </>
           ) : (
            <>
                <Avatar className="h-9 w-9">
                    <AvatarFallback>??</AvatarFallback>
                </Avatar>
                <div className="ml-3">
                    <p className="text-sm font-medium">Guest</p>
                    <p className="text-xs text-muted-foreground">Not signed in</p>
                </div>
            </>
           )}
        </div>
      </div>
    </aside>
  );
}
