import SparkAiBubble from '@/components/spark/SparkAiBubble';
import SparkUserBubble from '@/components/spark/SparkUserBubble';
import useSpark from '@/hooks/spark';
import { SparkState } from '@/utils/spark.util';

export default function SparkChat() {
  const spark = useSpark();
  const history = spark.history;

  return (
    <div className="flex flex-col gap-12 lg:pt-28">
      {history.map((content, index) =>
        content.type === 'user' ? (
          <SparkUserBubble key={index} message={content.message} />
        ) : (
          <SparkAiBubble key={index} message={content.message} streaming={false} />
        )
      )}
      {spark.state === SparkState.STREAMING && spark.response !== null && (
        <SparkAiBubble message={spark.response} streaming />
      )}
      <div className="h-[110px] w-full lg:h-[124px]" />
    </div>
  );
}
