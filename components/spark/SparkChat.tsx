import AdsenseSparkChat from '@/components/core/ad/AdsenseSparkChat';
import SparkAiBubble from '@/components/spark/SparkAiBubble';
import SparkUserBubble from '@/components/spark/SparkUserBubble';
import useSpark from '@/hooks/spark';
import { useEffect } from 'react';

export default function SparkChat() {
  const spark = useSpark();
  const history = spark.history;

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [spark]);

  return (
    <div className="-mt-16 flex flex-col gap-8 lg:mt-0">
      <AdsenseSparkChat />
      <div className="flex flex-col gap-12 lg:pt-28">
        {history.map((content, index) =>
          content.type === 'user' ? (
            <SparkUserBubble key={index} message={content.message} />
          ) : (
            <SparkAiBubble key={index} content={content} streaming={false} />
          )
        )}
        <SparkAiBubble streaming />
        <div className="h-[110px] w-full lg:h-[124px]" />
      </div>
    </div>
  );
}
