'use client';

import SparkHeading from '@/components/spark/SparkHeading';
import SparkInput from '@/components/spark/SparkInput';
import useSpark from '@/hooks/spark';

export default function SparkContent() {
  const spark = useSpark();
  const history = spark.history;

  return (
    <div className="relative size-full">
      {history.length === 0 && <SparkHeading />}
      <SparkInput />
    </div>
  );
}
