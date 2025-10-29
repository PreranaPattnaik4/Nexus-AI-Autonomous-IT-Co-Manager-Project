
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
  User,
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
  { href: '/history', label: 'History', icon: History },
  { href: '/integrations', label: 'Integrations', icon: Zap },
  { href: '/profile', label: 'Profile & Settings', icon: User },
];

export function AppSidebarNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const getIsActive = (href: string) => {
    const [baseHref, queryString] = href.split('?');
    
    // Handle hash links for dashboard
    if (href.includes('#')) {
      // This is a simple check, might need refinement for more complex hash links
      return pathname === baseHref;
    }

    if (pathname !== baseHref) {
      // Handle special cases where parent should be active
      if (baseHref === '/profile' && (pathname === '/settings')) return true;
      if (baseHref === '/history' && (pathname === '/completed' || pathname === '/reports')) return true;
      return false;
    }

    if (!queryString) {
      // if there's a status param, don't make the parent active
      return !searchParams.has('status');
    }
    
    const hrefParams = new URLSearchParams(queryString);
    const statusParam = hrefParams.get('status');

    return searchParams.get('status') === statusParam;
  };


  return (
    <div className='p-4 space-y-1'>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = getIsActive(item.href);

        return (
          <Button
            key={item.href}
            variant={isActive ? 'secondary' : 'ghost'}
            className="w-full justify-start"
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
  );
}
