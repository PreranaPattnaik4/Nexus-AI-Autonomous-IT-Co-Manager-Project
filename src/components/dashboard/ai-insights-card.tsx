'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bot } from 'lucide-react';

export function AiInsightsCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          <CardTitle>AI Insights</CardTitle>
        </div>
        <CardDescription>Weekly optimization summary</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center p-4 bg-accent/20 rounded-lg border border-dashed border-accent">
            <p className="text-sm font-medium text-accent-foreground">
                "AI reduced average CPU usage by 23% this week by optimizing server patch cycles."
            </p>
            <p className="text-xs text-muted-foreground mt-2">— Gemini, your Autonomous IT Co-Manager</p>
        </div>
      </CardContent>
    </Card>
  );
}
