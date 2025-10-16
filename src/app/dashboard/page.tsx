import { GoalForm } from '@/components/dashboard/goal-form';
import { TasksList } from '@/components/dashboard/tasks-list';
import { MetricsCharts } from '@/components/dashboard/metrics-charts';
import { AlertsCard } from '@/components/dashboard/alerts-card';
import { TaskStats } from '@/components/dashboard/task-stats';
import { SystemHealthSummary } from '@/components/dashboard/system-health-summary';
import { AiInsightsCard } from '@/components/dashboard/ai-insights-card';

export default function DashboardPage() {
  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-4">
      <div className="col-span-1 lg:col-span-4">
        <TaskStats />
      </div>
      <div className="col-span-1 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
        <SystemHealthSummary />
        <AiInsightsCard />
      </div>
       <div className="col-span-1 lg:col-span-1">
        <AlertsCard />
      </div>
      <div className="col-span-1 lg:col-span-2">
        <GoalForm />
      </div>
      <div className="col-span-1 lg:col-span-2">
        <TasksList />
      </div>
      <div className="col-span-1 lg:col-span-4">
        <MetricsCharts />
      </div>
    </div>
  );
}
