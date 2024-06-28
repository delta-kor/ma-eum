import dynamic from 'next/dynamic';

export const FutureRelativeTime = dynamic(
  () => import('@/components/core/time/FutureRelativeTime')
);
