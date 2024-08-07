import GradientIcon from '@/components/core/GradientIcon';
import useSpark from '@/hooks/spark';
import { SparkState } from '@/utils/spark.util';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './markdown.css';

interface Props {
  message?: string;
  streaming: boolean;
}

export default function SparkAiBubble({ message, streaming }: Props) {
  const spark = useSpark();

  if (!streaming)
    return (
      <div className="flex flex-col gap-8 rounded-16 bg-gray-50 p-16">
        <div className="flex items-center gap-8">
          <GradientIcon type="aiMessage" className="w-16" />
          <div className="text-16 font-700 text-primary-500">Spark</div>
        </div>
        <div className="scrollbar-hide overflow-x-scroll text-14 font-400 leading-6 text-black">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{message}</ReactMarkdown>
        </div>
      </div>
    );

  const state = spark.state;
  if (state === SparkState.LOADING || state === SparkState.SENDING)
    return (
      <div className="flex flex-col gap-8 rounded-16 bg-gray-50 p-16">
        <div className="flex items-center gap-8">
          <GradientIcon type="aiMessage" className="w-16" />
          <div className="text-16 font-700 text-primary-500">Spark</div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="h-[17px] w-full animate-pulse rounded-8 bg-gray-200" />
          <div className="h-[17px] w-1/3 animate-pulse rounded-8 bg-gray-200" />
        </div>
      </div>
    );

  if (state === SparkState.STREAMING)
    return (
      <div className="flex flex-col gap-8 rounded-16 bg-gray-50 p-16">
        <div className="flex items-center gap-8">
          <GradientIcon type="aiMessage" className="w-16" />
          <div className="text-16 font-700 text-primary-500">Spark</div>
        </div>
        <div className="scrollbar-hide overflow-x-scroll text-14 font-400 leading-6 text-black">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{spark.response || ''}</ReactMarkdown>
        </div>
      </div>
    );
}
