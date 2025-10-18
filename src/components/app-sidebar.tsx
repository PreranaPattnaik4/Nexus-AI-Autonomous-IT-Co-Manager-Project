'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import {
  LayoutDashboard,
  ListChecks,
  Settings,
  CircleHelp,
  Zap,
  MessageCircle,
  Terminal,
  History,
  Loader,
  CheckCheck,
  XCircle,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Logo } from './icons';
import { Skeleton } from './ui/skeleton';

const navItems = [
  { href: '/chat', label: 'Chat', icon: MessageCircle },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/console', label: 'Command Console', icon: Terminal },
  { href: '/tasks', label: 'All Tasks', icon: ListChecks },
  { href: '/tasks?status=in-progress', label: 'In Progress', icon: Loader, isTaskItem: true },
  { href: '/tasks?status=completed', label: 'Completed', icon: CheckCheck, isTaskItem: true },
  { href: '/tasks?status=failed', label: 'Failed', icon: XCircle, isTaskItem: true },
  { href: '/history', label: 'History', icon: History },
  { href: '/integrations', label: 'Integrations', icon: Zap },
  { href: '/settings', label: 'Settings', icon: Settings },
];

function NavItems() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const status = searchParams.get('status');
  const tab = searchParams.get('tab');

  let currentPath = pathname;
  if (status) {
    currentPath = `${pathname}?status=${status}`;
  } else if (tab) {
    currentPath = `${pathname}?tab=${tab}`;
  }


  return (
    <>
      {navItems.map((item) => {
        const isActive = item.href === currentPath;
        const Icon = item.icon;

        return (
          <Button
            key={item.href}
            variant={isActive ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            asChild
          >
            <Link href={item.href}>
              <Icon className={cn("mr-2 h-4 w-4", item.label === 'In Progress' && 'animate-spin')} />
              {item.label}
            </Link>
          </Button>
        )
      })}
    </>
  );
}

function NavItemsSkeleton() {
    return (
        <>
            {navItems.map((item) => (
                <Skeleton key={item.href} className="h-10 w-full" />
            ))}
        </>
    )
}

export function AppSidebar() {
  return (
    <aside className="h-screen w-64 flex-shrink-0 flex flex-col bg-card border-r">
      <div className="flex items-center justify-center h-16 border-b">
        <Logo className="h-6 w-6 text-primary" />
        <h1 className="ml-2 text-xl font-bold tracking-tight">Nexus AI</h1>
      </div>
      <nav className="flex-1 px-4 py-4 space-y-1">
        <Suspense fallback={<NavItemsSkeleton />}>
            <NavItems />
        </Suspense>
      </nav>
      <div className="mt-auto p-4 border-t">
        <Button variant="ghost" className="w-full justify-start mb-4" asChild>
           <Link href="/help">
              <CircleHelp className="mr-2 h-4 w-4" />
              Help & Support
            </Link>
        </Button>
        <div className="flex items-center">
            <Avatar className="h-9 w-9">
                <AvatarFallback>??</AvatarFallback>
            </Avatar>
            <div className="ml-3">
                <p className="text-sm font-medium">Guest</p>
                <p className="text-xs text-muted-foreground">Not signed in</p>
            </div>
        </div>
      </div>
    </aside>
  );
}
