'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { ListChecks, Loader, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCollection, useFirestore } from '@/firebase';
import { Task } from '@/lib/firestore-types';
import { collection, query } from 'firebase/firestore';
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
  const firestore = useFirestore();
  const tasksQuery = firestore ? query(collection(firestore, 'tasks')) : null;
  const { data: tasks, loading } = useCollection<Task>(tasksQuery);

  const stats = useMemo(() => {
    if (!tasks) {
      return { total: 0, inProgress: 0, completed: 0, failed: 0 };
    }
    return {
      total: tasks.length,
      inProgress: tasks.filter((t) => t.status === 'in-progress').length,
      completed: tasks.filter((t) => t.status === 'completed').length,
      failed: tasks.filter((t) => t.status === 'failed').length,
    };
  }, [tasks]);

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
