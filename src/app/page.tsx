import { AppSidebar } from '@/components/app-sidebar';
import { AppHeader } from '@/components/app-header';
import { GoalForm } from '@/components/dashboard/goal-form';
import { TasksList } from '@/components/dashboard/tasks-list';
import { MetricsCharts } from '@/components/dashboard/metrics-charts';
import { AlertsCard } from '@/components/dashboard/alerts-card';
import { initialAlerts, type Alert } from '@/lib/data';

export default function DashboardPage() {
  // In a real app, this would be fetched from a database
  const alerts: Alert[] = initialAlerts;

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <AppSidebar />
      <div className="flex flex-1 flex-col">
        <AppHeader />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-5">
            <GoalForm />
            <TasksList />
            <MetricsCharts />
            <AlertsCard alerts={alerts} />
          </div>
        </main>
      </div>
    </div>
  );
}
