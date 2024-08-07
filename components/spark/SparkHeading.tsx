import SparkIntro from '@/components/spark/SparkIntro';
import SparkPromptExamples from '@/components/spark/SparkPromptExamples';

export default function SparkHeading() {
  function handleExampleSelected(prompt: string) {
    console.log(prompt);
  }

  return (
    <div className="absolute left-1/2 top-details-header-height flex w-full -translate-x-1/2 flex-col items-center gap-28">
      <SparkIntro />
      <div className="flex flex-col items-center gap-16 self-stretch">
        <SparkPromptExamples onSelected={handleExampleSelected} />
        <div className="flex gap-6">
          <div className="pt-3 text-16 font-500 text-gray-200">Powered by</div>
          <object data="/spark/gemini.svg" className="h-20" />
        </div>
      </div>
      <div className="h-[175px] w-full" />
    </div>
  );
}
