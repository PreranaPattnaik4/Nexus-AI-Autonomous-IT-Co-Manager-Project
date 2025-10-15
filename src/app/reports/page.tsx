import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export default function ReportsPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          <CardTitle>Reports</CardTitle>
        </div>
        <CardDescription>
          View generated Root Cause Analysis (RCA) reports.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Reports will be listed here.</p>
      </CardContent>
    </Card>
  );
}
