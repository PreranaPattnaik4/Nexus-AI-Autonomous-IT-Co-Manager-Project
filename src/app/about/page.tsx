
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Info } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            <CardTitle>About Nexus AI</CardTitle>
          </div>
          <CardDescription>
            The future of autonomous IT management.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <p>
            Nexus AI is a proactive, agentic AI solution for IT management. It redefines IT operations by moving beyond simple automation to create a truly autonomous, intelligent partner. Unlike traditional IT automation tools that only follow predefined rules, Nexus can understand high-level goals and independently plan, execute, and adapt its actions to achieve them.
          </p>
          <p>
            It acts as an intelligent "project manager" for your IT infrastructure, handling everything from routine tasks to complex, multi-step problem-solving. This is not just a tool; it is a fundamental shift in how IT is managed, turning reactive firefighting into proactive strategy.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
