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
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Logo } from './icons';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/tasks', label: 'All Tasks', icon: ListChecks },
  { href: '/tasks?status=in-progress', label: 'In Progress', icon: Loader },
  { href: '/tasks?status=completed', label: 'Completed', icon: CheckCheck },
  { href: '/tasks?status=failed', label: 'Failed', icon: XCircle },
  { href: '/reports', label: 'Reports', icon: FileText },
  { href: '/integrations', label: 'Integrations', icon: Zap },
  { href: '/settings', label: 'Settings', icon: Settings },
];

// This sub-component safely uses the client-side hooks
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
          <Avatar className="h-9 w-9">
            <AvatarImage src="https://picsum.photos/seed/user/40/40" alt="User" data-ai-hint="person avatar" />
            <AvatarFallback>IT</AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <p className="text-sm font-medium">IT Manager</p>
            <p className="text-xs text-muted-foreground">manager@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
