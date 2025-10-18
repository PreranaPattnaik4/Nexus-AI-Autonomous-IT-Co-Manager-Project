'use client';

import Link from 'next/link';
import { ListChecks, Loader, CheckCircle2, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function StatCard({
  title,
  value,
  icon,
  loading,
  href
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  loading: boolean;
  href: string;
}) {
  return (
    <Link href={href} className="block">
      <Card className="hover:bg-card/80 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {icon}
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-8 w-16" />
          ) : (
            <div className="text-2xl font-bold">{value}</div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

export function TaskStats() {

  const loading = false;
  const stats = {
    total: 8,
    inProgress: 2,
    completed: 4,
    failed: 1,
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Tasks"
        value={stats.total}
        icon={<ListChecks className="h-4 w-4 text-muted-foreground" />}
        loading={loading}
        href="/tasks"
      />
      <StatCard
        title="In Progress"
        value={stats.inProgress}
        icon={<Loader className="h-4 w-4 text-muted-foreground animate-spin" />}
        loading={loading}
        href="/tasks?status=in-progress"
      />
      <StatCard
        title="Completed"
        value={stats.completed}
        icon={<CheckCircle2 className="h-4 w-4 text-muted-foreground" />}
        loading={loading}
        href="/tasks?status=completed"
      />
      <StatCard
        title="Failed"
        value={stats.failed}
        icon={<XCircle className="h-4 w-4 text-muted-foreground" />}
        loading={loading}
        href="/tasks?status=failed"
      />
    </div>
  );
}
