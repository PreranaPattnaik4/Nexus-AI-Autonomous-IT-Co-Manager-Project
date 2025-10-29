'use client';

import Link from 'next/link';
import { CircleHelp } from 'lucide-react';
import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Logo } from './icons';
import { AppSidebarNav } from './app-sidebar-nav';
import { Skeleton } from './ui/skeleton';


function NavItemsSkeleton() {
    return (
        <div className="p-4 space-y-1">
            {[...Array(11)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
            ))}
        </div>
    )
}

export function AppSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden h-screen w-64 flex-shrink-0 flex-col border-r bg-card md:flex">
      <div className="flex items-center justify-center h-20 flex-shrink-0 border-b px-4">
        <Link href="/" className='flex items-center gap-2'>
            <Logo className="h-6 w-6 text-primary" />
            <div>
              <h1 className="text-lg font-bold tracking-tight text-primary">Nexus AI</h1>
              <p className="text-xs text-muted-foreground">Autonomous IT Co-Manager</p>
            </div>
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <Suspense fallback={<NavItemsSkeleton />}>
            <AppSidebarNav />
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
