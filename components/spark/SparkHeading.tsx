import SparkIntro from '@/components/spark/SparkIntro';
import SparkPromptExamples from '@/components/spark/SparkPromptExamples';
import useSpark from '@/hooks/spark';

export default function SparkHeading() {
  const spark = useSpark();

  function handleExampleSelected(prompt: string) {
    spark.send(prompt);
  }

  return (
    <div className="absolute left-1/2 top-24 flex w-full -translate-x-1/2 flex-col items-center gap-28 lg:top-64">
      <SparkIntro />
      <div className="flex flex-col items-center gap-16 self-stretch">
        <SparkPromptExamples onSelected={handleExampleSelected} />
        <div className="flex gap-6">
          <div className="pt-3 text-16 font-500 text-gray-200">Powered by</div>
          <object data="/spark/gemini.svg" className="h-20" />
        </div>
      </div>
      <div className="h-[188px] w-full lg:h-[140px]" />
    </div>
  );
}
