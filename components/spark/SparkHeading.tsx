import SparkIntro from '@/components/spark/SparkIntro';
import SparkPromptExamples from '@/components/spark/SparkPromptExamples';

export default function SparkHeading() {
  return (
    <div className="absolute left-1/2 top-details-header-height flex w-full -translate-x-1/2 flex-col gap-28">
      <SparkIntro />
      <SparkPromptExamples />
    </div>
  );
}
