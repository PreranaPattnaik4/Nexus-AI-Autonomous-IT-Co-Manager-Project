'use client';

import { useState } from 'react';
import { FileText, Loader } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { generateRcaReport } from '@/lib/actions';

export function RcaReportDialog({ taskId }: { taskId: string }) {
  const [report, setReport] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleOpen = async () => {
    if (report) return;
    setIsLoading(true);
    const generatedReport = await generateRcaReport(taskId);
    setReport(generatedReport);
    setIsLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm" onClick={handleOpen}>
          <FileText className="mr-2 h-4 w-4" />
          View RCA Report
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Root Cause Analysis Report</DialogTitle>
          <DialogDescription>AI-generated report for task: {taskId}</DialogDescription>
        </DialogHeader>
        <div className="prose prose-sm dark:prose-invert max-h-[60vh] overflow-y-auto rounded-md border p-4">
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <Loader className="h-8 w-8 animate-spin text-primary" />
              <p className="ml-4">Generating report...</p>
            </div>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: report.replace(/\n/g, '<br />') }} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
