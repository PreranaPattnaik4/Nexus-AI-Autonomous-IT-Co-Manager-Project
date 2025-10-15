'use client';

import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { metricsData } from '@/lib/data';

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

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-4))'];

export function MetricsCharts() {
  return (
    <div className="col-span-1 lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>CPU Usage</CardTitle>
          <CardDescription>Last 30 minutes</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={cpuChartConfig} className="h-40 w-full">
            <LineChart data={metricsData.cpu} margin={{ left: -20, right: 10, top: 5, bottom: 5 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={12} unit="%" />
              <Tooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Line dataKey="usage" type="monotone" stroke="var(--color-usage)" strokeWidth={2} dot={false} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Memory Distribution</CardTitle>
          <CardDescription>Current snapshot</CardDescription>
        </CardHeader>
        <CardContent>
           <ChartContainer config={memoryChartConfig} className="h-40 w-full">
             <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
                <Pie data={metricsData.memory} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                  {metricsData.memory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Network I/O</CardTitle>
          <CardDescription>MB/s over last 30 minutes</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={networkChartConfig} className="h-40 w-full">
            <BarChart data={metricsData.network} margin={{ left: -20, right: 10, top: 5, bottom: 5 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={12} unit="MB/s" />
              <Tooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar dataKey="received" fill="var(--color-received)" radius={4} />
              <Bar dataKey="sent" fill="var(--color-sent)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
