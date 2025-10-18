
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
  AlertTriangle,
  User,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
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
  { href: '/dashboard#alerts', label: 'Active Alerts', icon: AlertTriangle },
  { href: '/history', label: 'History', icon: History },
  { href: '/integrations', label: 'Integrations', icon: Zap },
  { href: '/profile', label: 'Profile & Settings', icon: User },
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
    // Special handling for history page tabs
    if (pathname === '/history') {
      const defaultValue = 'completed';
      currentPath = `/history?tab=${tab || defaultValue}`;
      if (tab === 'completed') {
        const completedTaskPath = '/tasks?status=completed';
        if(currentPath === completedTaskPath) {
            currentPath = completedTaskPath;
        }
      }
    }
  }


  return (
    <>
      {navItems.map((item) => {
        let isActive = item.href === currentPath;

        // Ensure parent 'Tasks' is not active when a sub-filter is
        if (item.href === '/tasks' && status) {
          isActive = false;
        }
        
        // Handle settings link being active on profile page
        if (item.href === '/profile' && pathname === '/settings') {
          isActive = true;
        }

        // A special check for the "Completed" link in the sidebar to also match the history tab
        if (item.href.includes('status=completed') && currentPath.includes('tab=completed')) {
            isActive = true;
        }
        
        if (item.href.includes('status=failed') && currentPath.includes('tab=failed')) {
            isActive = true;
        }

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
      <div className="flex items-center justify-center h-20 border-b px-4">
        <Link href="/" className='flex items-center gap-2'>
            <Logo className="h-6 w-6 text-blue-900 dark:text-blue-400" />
            <div>
              <h1 className="text-lg font-bold tracking-tight text-blue-900 dark:text-blue-400">Nexus AI</h1>
              <p className="text-xs text-muted-foreground">Autonomous IT Co-Manager</p>
            </div>
        </Link>
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
      </div>
    </aside>
  );
}
