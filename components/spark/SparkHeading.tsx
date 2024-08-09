import Icon from '@/components/core/Icon';
import AdsenseSpark from '@/components/core/ad/AdsenseSpark';
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
        <a
          href="https://hurricane-jury-959.notion.site/About-Spark-2d2d572775d84a77868b6f19a15d2ea1"
          target="_blank"
          className="flex flex-col items-center gap-8 p-8"
        >
          <div className="flex items-center gap-4 text-gray-500">
            <div className="text-14 font-500">More Info</div>
            <Icon type="right" className="w-10" />
          </div>
        </a>
      </div>
      <AdsenseSpark />
      <div className="h-[188px] w-full lg:h-[140px]" />
    </div>
  );
}
