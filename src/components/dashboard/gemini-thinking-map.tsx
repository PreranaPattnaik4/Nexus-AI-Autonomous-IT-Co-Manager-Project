'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bot } from 'lucide-react';
import { UnderstandIcon, PlanIcon, MonitorIcon, ReportIcon } from '../icons';

const thinkingSteps = [
  { name: 'Understand', icon: UnderstandIcon, description: 'Parse the natural language goal.' },
  { name: 'Plan', icon: PlanIcon, description: 'Planner Agent creates a step-by-step plan.' },
  { name: 'Execute & Monitor', icon: MonitorIcon, description: 'Executor Agent performs actions.' },
  { name: 'Verify & Report', icon: ReportIcon, description: 'Reporter Agent analyzes results & creates RCA.' },
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
            <CardTitle>Multi-Agent Collaboration</CardTitle>
        </div>
        <CardDescription>Visualizing how Nexus AI agents work together to achieve your goals.</CardDescription>
      </CardHeader>
      <CardContent className="flex items-start justify-center pt-2">
        {thinkingSteps.map((step, index) => (
          <React.Fragment key={step.name}>
            <div className="flex flex-col items-center text-center w-32">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-secondary text-secondary-foreground mb-2">
                <step.icon className="h-6 w-6" />
              </div>
              <p className="text-xs font-semibold">{step.name}</p>
              <p className="text-xs text-muted-foreground mt-1 hidden md:block">{step.description}</p>
            </div>
            <Connector isLast={index === thinkingSteps.length - 1} />
          </React.Fragment>
        ))}
      </CardContent>
    </Card>
  );
}
