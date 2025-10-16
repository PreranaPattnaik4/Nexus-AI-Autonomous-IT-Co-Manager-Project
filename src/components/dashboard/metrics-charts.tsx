'use client';

import { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { useCollection, useFirestore } from '@/firebase';
import { System } from '@/lib/firestore-types';
import { collection, query } from 'firebase/firestore';
import { Skeleton } from '../ui/skeleton';

const cpuChartConfig = {
  usage: {
    label: 'CPU Usage',
    color: 'hsl(var(--primary))',
  },
};

const networkChartConfig = {
  received: {
    label: 'Received',
    color: 'hsl(var(--primary))',
  },
  sent: {
    label: 'Sent',
    color: 'hsl(var(--accent))',
  },
};

const memoryChartConfig = {
  memory: {
    label: 'Memory',
  },
};

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

function ChartSkeleton() {
    return <Skeleton className="h-40 w-full" />;
}

export function MetricsCharts() {
  const firestore = useFirestore();

  const systemsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'systems'));
  }, [firestore]);

  const { data: systems, loading } = useCollection<System>(systemsQuery);

  const { cpuData, memoryData, networkData } = useMemo(() => {
    const now = new Date();
    const cpuData = Array.from({ length: 7 }, (_, i) => {
        const time = new Date(now.getTime() - (6 - i) * 5 * 60 * 1000);
        const usage = Math.floor(Math.random() * (75 - 40 + 1)) + 40 + Math.floor(i * 2);
        return {
            time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            usage,
        };
    });

    const memoryData = systems?.map(system => ({ name: system.name, value: system.memoryUsage })) || [];
    
    const networkData = Array.from({ length: 7 }, (_, i) => {
        const time = new Date(now.getTime() - (6 - i) * 5 * 60 * 1000);
        return {
            time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            received: Math.floor(Math.random() * (70 - 40 + 1)) + 40,
            sent: Math.floor(Math.random() * (50 - 20 + 1)) + 20,
        };
    });

    return { cpuData, memoryData, networkData };
  }, [systems]);

  return (
    <div className="col-span-1 lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>CPU Usage</CardTitle>
          <CardDescription>Last 30 minutes</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? <ChartSkeleton /> : (
            <ChartContainer config={cpuChartConfig} className="h-40 w-full">
              <LineChart data={cpuData} margin={{ left: -20, right: 10, top: 5, bottom: 5 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={12} unit="%" />
                <Tooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Line dataKey="usage" type="monotone" stroke="var(--color-usage)" strokeWidth={2} dot={false} />
              </LineChart>
            </ChartContainer>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Memory Distribution</CardTitle>
          <CardDescription>Current snapshot</CardDescription>
        </CardHeader>
        <CardContent>
           {loading ? <ChartSkeleton /> : (
             <ChartContainer config={memoryChartConfig} className="h-40 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
                  <Pie data={memoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label={({ name, value }) => `${name.split(' ')[0]} ${value}%` } fontSize={10} labelLine={false}>
                    {memoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
           )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Network I/O</CardTitle>
          <CardDescription>MB/s over last 30 minutes</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? <ChartSkeleton /> : (
            <ChartContainer config={networkChartConfig} className="h-40 w-full">
              <BarChart data={networkData} margin={{ left: -20, right: 10, top: 5, bottom: 5 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={12} unit="MB/s" />
                <Tooltip cursor={false} content={<ChartTooltipContent />} />
                <Bar dataKey="received" fill="var(--color-received)" radius={4} />
                <Bar dataKey="sent" fill="var(--color-sent)" radius={4} />
              </BarChart>
            </ChartContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
