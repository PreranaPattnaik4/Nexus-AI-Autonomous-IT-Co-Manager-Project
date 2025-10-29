
import { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { History } from 'lucide-react';
import { HistoryTabs } from './history-tabs';
import { Skeleton } from '@/components/ui/skeleton';


function HistoryPageSkeleton() {
    return (
        <div className="space-y-4">
            <div className="flex space-x-1 border-b">
                <Skeleton className="h-10 w-28" />
                <Skeleton className="h-10 w-28" />
                <Skeleton className="h-10 w-28" />
            </div>
             <div className="space-y-6 pr-6">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="space-y-2">
                    <Skeleton className="h-5 w-3/4" />
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-2 flex-1" />
                        <Skeleton className="h-4 w-10" />
                    </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default function HistoryPage() {

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <History className="h-5 w-5" />
          <CardTitle>Task & Report History</CardTitle>
        </div>
        <CardDescription>
          Review past activities, including completed tasks, failures, and a 30-day task log.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<HistoryPageSkeleton />}>
            <HistoryTabs />
        </Suspense>
      </CardContent>
    </Card>
  );
}
