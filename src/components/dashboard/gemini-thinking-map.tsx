'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bot, Search, Play, CheckCheck, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UnderstandIcon, PlanIcon } from '../icons';

const thinkingSteps = [
  { name: 'Understand', icon: UnderstandIcon, description: 'Parse the natural language goal.' },
  { name: 'Plan', icon: PlanIcon, description: 'Break down the goal into actionable steps.' },
  { name: 'Execute', icon: Play, description: 'Perform the steps sequentially.' },
  { name: 'Verify', icon: CheckCheck, description: 'Confirm successful completion.' },
  { name: 'Report', icon: FileText, description: 'Generate logs and RCA reports.' },
];

function Connector({ isLast = false }: { isLast?: boolean }) {
  if (isLast) return null;
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="w-full h-px bg-border -mx-2"></div>
    </div>
  );
}

export function GeminiThinkingMap() {
  return (
    <Card className="col-span-1 lg:col-span-3">
      <CardHeader>
        <div className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            <CardTitle>Gemini Thinking Map</CardTitle>
        </div>
        <CardDescription>Visualizing how Nexus AI breaks down your goals.</CardDescription>
      </CardHeader>
      <CardContent className="flex items-start justify-center pt-2">
        {thinkingSteps.map((step, index) => (
          <>
            <div key={step.name} className="flex flex-col items-center text-center w-24">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-secondary text-secondary-foreground mb-2">
                <step.icon className="h-6 w-6" />
              </div>
              <p className="text-xs font-semibold">{step.name}</p>
              <p className="text-xs text-muted-foreground mt-1 hidden md:block">{step.description}</p>
            </div>
            <Connector isLast={index === thinkingSteps.length - 1} />
          </>
        ))}
      </CardContent>
    </Card>
  );
}
