'use client';

import { redirect } from 'next/navigation';

export function CompletedTasksList() {
  redirect('/tasks?status=completed');
  return null;
}
