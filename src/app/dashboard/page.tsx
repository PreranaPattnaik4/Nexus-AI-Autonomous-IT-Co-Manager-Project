import { GoalForm } from '@/components/dashboard/goal-form';
import { TasksList } from '@/components/dashboard/tasks-list';
import { MetricsCharts } from '@/components/dashboard/metrics-charts';
import { AlertsCard } from '@/components/dashboard/alerts-card';

export default function DashboardPage() {
  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-5">
      <GoalForm />
      <TasksList />
      <MetricsCharts />
      <AlertsCard />
    </div>
  );
}
