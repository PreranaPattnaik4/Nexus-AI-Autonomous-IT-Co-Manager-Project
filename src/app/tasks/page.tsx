import { TasksList } from "@/components/dashboard/tasks-list";

export default function TasksPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const status = searchParams?.status as 'in-progress' | 'completed' | 'failed' | undefined;
  return <TasksList statusFilter={status} />;
}
