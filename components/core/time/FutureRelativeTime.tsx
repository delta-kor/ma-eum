'use client';

import useToday from '@/hooks/today';
import { getFutureRelativeTime } from '@/utils/time.util';

interface Props {
  date: Date;
}

export default function CSRFutureRelativeTime({ date }: Props) {
  const today = useToday();
  const text = getFutureRelativeTime(date, today);
  return <>{text}</>;
}
