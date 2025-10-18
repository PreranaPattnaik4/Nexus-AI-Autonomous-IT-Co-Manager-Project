'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { History, FileText, CheckCheck, XCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TasksList } from '@/components/dashboard/tasks-list';
import { Report } from '@/lib/firestore-types';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { marked } from 'marked';
import { useSearchParams } from 'next/navigation';


function ReportsList() {
    const staticReports: Report[] = [
        {
            id: 'report-1',
            taskId: 'task-abc-123',
            report: marked.parse(`## Root Cause Analysis: Server Patch Failure\n\n**1. Summary:**\n The goal to "Ensure all production servers are patched" failed at the patch application step for 'web-server-02'. The root cause was identified as a timeout error due to a temporary network misconfiguration.\n\n**2. Timeline:**\n- **10:05 AM:** Task initiated.\n- **10:07 AM:** Step 'apply_patch' on 'web-server-02' failed.\n- **10:08 AM:** AI retry mechanism initiated a new goal with corrected network parameters.\n\n**3. Resolution:**\nThe self-healing flow successfully re-ran the patch cycle, and all servers are now confirmed to be up-to-date.`),
            generatedAt: new Date(),
        },
        {
            id: 'report-2',
            taskId: 'task-def-456',
            report: marked.parse(`## Root Cause Analysis: Proactive CPU Scaling\n\n**1. Summary:**\nAn alert for "High CPU on Cache Server" was detected. Nexus AI proactively initiated a resolution task to vertically scale the cache server instance size.\n\n**2. Actions Taken:**\n- A new task was created: "Scale cache server instance to next size".\n- The task executed successfully, and CPU usage returned to normal levels within 5 minutes.\n\n**3. Outcome:**\nPotential downtime was averted. The system remained stable throughout the automated resolution process.`),
            generatedAt: new Date(Date.now() - 86400000), // 1 day ago
        }
    ];
    const reports = staticReports;
    const loading = false;

    if (loading) {
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

    return (
        <Accordion type="single" collapsible className="w-full">
        {reports && reports.length > 0 ? (
            reports.map((report) => (
            <AccordionItem value={report.id} key={report.id}>
                <AccordionTrigger>
                <div className="flex flex-col items-start text-left">
                    <CardTitle className="text-base font-semibold">Report for Task: {report.taskId}</CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">
                        {report.generatedAt && format(report.generatedAt, 'PPP p')}
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
    );
}

export default function HistoryPage() {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') || 'completed';

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <History className="h-5 w-5" />
          <CardTitle>Task & Report History</CardTitle>
        </div>
        <CardDescription>
          Review past activities, including completed tasks, failures, and RCA reports.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={tab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="completed">
                <CheckCheck className="mr-2 h-4 w-4" />
                Completed
            </TabsTrigger>
            <TabsTrigger value="failed">
                <XCircle className="mr-2 h-4 w-4" />
                Failed
            </TabsTrigger>
            <TabsTrigger value="reports">
                <FileText className="mr-2 h-4 w-4" />
                RCA Reports
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="completed" className="mt-4">
            <TasksList statusFilter="completed" />
          </TabsContent>

          <TabsContent value="failed" className="mt-4">
            <TasksList statusFilter="failed" />
          </TabsContent>

          <TabsContent value="reports" className="mt-4">
            <ReportsList />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
