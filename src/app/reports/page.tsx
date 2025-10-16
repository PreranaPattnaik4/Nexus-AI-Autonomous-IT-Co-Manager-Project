'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import { useCollection, useFirestore } from '@/firebase';
import { Report } from '@/lib/firestore-types';
import { collection, query, orderBy } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


function ReportsListSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex flex-col space-y-2 border-b pb-4">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      ))}
    </div>
  );
}

export default function ReportsPage() {
  const firestore = useFirestore();
  
  const reportsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'reports'), orderBy('generatedAt', 'desc'));
  }, [firestore]);

  const { data: reports, loading } = useCollection<Report>(reportsQuery);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          <CardTitle>RCA Reports</CardTitle>
        </div>
        <CardDescription>
          Review generated Root Cause Analysis (RCA) reports for completed or failed tasks.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <ReportsListSkeleton />
        ) : (
          <Accordion type="single" collapsible className="w-full">
            {reports && reports.length > 0 ? (
              reports.map((report) => (
                <AccordionItem value={report.id} key={report.id}>
                  <AccordionTrigger>
                    <div className="flex flex-col items-start text-left">
                       <CardTitle className="text-base font-semibold">Report for Task: {report.taskId}</CardTitle>
                       <p className="text-xs text-muted-foreground mt-1">
                          {report.generatedAt && format(report.generatedAt.toDate(), 'PPP p')}
                       </p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                     <div 
                        className="prose prose-sm dark:prose-invert max-w-none p-4 border rounded-md"
                        dangerouslySetInnerHTML={{ __html: report.report }} 
                      />
                  </AccordionContent>
                </AccordionItem>
              ))
            ) : (
              <p className="text-muted-foreground text-center py-8">No reports have been generated yet.</p>
            )}
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
}
