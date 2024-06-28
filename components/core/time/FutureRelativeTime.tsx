'use client';

import useToday from '@/hooks/today';
import { getFutureRelativeTime } from '@/utils/time.util';

interface Props {
  date: Date;
  isAllDay: boolean;
}

export default function CSRFutureRelativeTime({ date, isAllDay }: Props) {
  const today = useToday();
  const text = getFutureRelativeTime(date, today, isAllDay);
  return <>{text}</>;
}
