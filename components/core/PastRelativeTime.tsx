'use client';

import useToday from '@/hooks/today';
import { getPastRelativeTime } from '@/utils/time.util';

interface Props {
  date: Date;
}

export default function PastRelativeTime({ date }: Props) {
  const today = useToday();
  const relativeTime = getPastRelativeTime(date, today);

  return <>{relativeTime}</>;
}
