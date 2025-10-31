
'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
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
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/chat', label: 'Chat', icon: MessageCircle },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/console', label: 'Command Console', icon: Terminal },
  { href: '/tasks', label: 'All Tasks', icon: ListChecks },
  { href: '/tasks?status=in-progress', label: 'In Progress', icon: Loader },
  { href: '/tasks?status=completed', label: 'Completed', icon: CheckCheck },
  { href: '/tasks?status=failed', label: 'Failed', icon: XCircle },
  { href: '/dashboard#alerts', label: 'Active Alerts', icon: AlertTriangle },
  { href: '/history', label: 'Task & Report History', icon: History },
  { href: '/integrations', label: 'Integrations', icon: Zap },
  { href: '/help', label: 'Help & Support', icon: CircleHelp },
  { href: '/profile', label: 'Settings', icon: Settings },
];

export function AppSidebarNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const getIsActive = (href: string) => {
    const [baseHref, queryString] = href.split('?');
    
    if (href.includes('#')) {
      return pathname === baseHref;
    }

    if (pathname !== baseHref) {
      // Special handling for pages that are logically grouped
      if (baseHref === '/profile' && pathname === '/settings') return true;
      if (baseHref === '/settings' && pathname === '/profile') return true;
      if (baseHref === '/history' && (pathname === '/completed' || pathname === '/reports')) return true;
      if (baseHref === '/tasks' && pathname === '/history' && searchParams.has('tab')) return false;
      return false;
    }

    if (!queryString) {
      if (pathname === '/tasks') {
        return !searchParams.has('status');
      }
      return true;
    }
    
    const hrefParams = new URLSearchParams(queryString);
    const statusParam = hrefParams.get('status');

    return searchParams.get('status') === statusParam;
  };


  return (
    <div className='p-4 space-y-1 flex-1 flex flex-col'>
      <div className='space-y-1'>
        {navItems.slice(0, 10).map((item) => {
          const Icon = item.icon;
          const isActive = getIsActive(item.href);

          return (
            <Button
              key={item.href}
              variant={isActive ? 'secondary' : 'ghost'}
              className="w-full justify-start h-9"
              asChild
            >
              <Link href={item.href}>
                <Icon className={cn("mr-2 h-4 w-4", item.label === 'In Progress' && isActive && 'animate-spin')} />
                {item.label}
              </Link>
            </Button>
          )
        })}
      </div>
      <div className='mt-auto space-y-1'>
        {navItems.slice(10).map((item) => {
          const Icon = item.icon;
          const isActive = getIsActive(item.href);
           return (
            <Button
              key={item.href}
              variant={isActive ? 'secondary' : 'ghost'}
              className="w-full justify-start h-9"
              asChild
            >
              <Link href={item.href}>
                <Icon className="mr-2 h-4 w-4" />
                {item.label}
              </Link>
            </Button>
          )
        })}
      </div>
    </div>
  );
}
