
'use client';

import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';

export function ClientTime({ date }: { date: Date }) {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    setTimeAgo(formatDistanceToNow(new Date(date), { addSuffix: true }));
  }, [date]);

  if (!timeAgo) {
    return null; // Return null on the server and initial client render
  }

  return <>{timeAgo}</>;
}
