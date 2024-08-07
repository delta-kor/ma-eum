'use client';

import SparkHeading from '@/components/spark/SparkHeading';
import SparkInput from '@/components/spark/SparkInput';
import useSpark from '@/hooks/spark';

export default function SparkContent() {
  const spark = useSpark();

  return (
    <div className="relative size-full">
      <SparkHeading />
      <SparkInput />
    </div>
  );
}
