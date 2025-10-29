
'use client';

import Link from 'next/link';
import { Suspense } from 'react';
import { Logo } from './icons';
import { AppSidebarNav } from './app-sidebar-nav';
import { Skeleton } from './ui/skeleton';


function NavItemsSkeleton() {
    return (
        <div className="p-4 space-y-1">
            {[...Array(12)].map((_, i) => (
                <Skeleton key={i} className="h-9 w-full" />
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
      <nav className="flex flex-col flex-1">
        <Suspense fallback={<NavItemsSkeleton />}>
            <AppSidebarNav />
        </Suspense>
      </nav>
    </aside>
  );
}
