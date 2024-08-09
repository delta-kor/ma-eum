import GradientIcon from '@/components/core/GradientIcon';
import Icon from '@/components/core/Icon';
import useModal from '@/hooks/modal';
import useSpark from '@/hooks/spark';
import { ModalResult } from '@/providers/ModalProvider';
import { SparkContent, SparkState, flagSpark } from '@/utils/spark.util';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './markdown.css';

interface Props {
  content?: SparkContent;
  streaming: boolean;
}

export default function SparkAiBubble({ content, streaming }: Props) {
  const spark = useSpark();
  const modal = useModal();

  function handleFlagClick() {
    modal.confirm('$spark_flag_confirm', handleFlag);
  }

  async function handleFlag(result: ModalResult) {
    if (result.type !== 'confirm') return;
    if (!content || !content.bubbleId) return;

    const flagResult = await flagSpark(content.bubbleId);
    modal.alert(flagResult ? '$spark_flag_success' : '$spark_flag_failure');
  }

  function handleCopyClick() {
    void navigator.clipboard.writeText(content!.message);
  }

  if (!streaming)
    return (
      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-8 rounded-16 bg-gray-50 p-16">
          <div className="flex items-center gap-8">
            <GradientIcon type="aiMessage" className="w-16" />
            <div className="text-16 font-700 text-primary-500">Spark</div>
          </div>
          <div className="scrollbar-hide overflow-x-scroll text-14 font-400 leading-6 text-black">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content!.message}</ReactMarkdown>
          </div>
        </div>
        <div className="flex items-center justify-end gap-20">
          <div
            onClick={handleFlagClick}
            className="jelly jelly-increased -m-8 shrink-0 cursor-pointer rounded-8 p-8 hover:scale-110 hover:bg-gray-50 selected:bg-gray-50"
          >
            <Icon type="flag" className="w-16 text-gray-200" />
          </div>
          <div
            onClick={handleCopyClick}
            className="jelly jelly-increased -m-8 shrink-0 cursor-pointer rounded-8 p-8 hover:scale-110 hover:bg-gray-50 selected:bg-gray-50"
          >
            <Icon type="copy" className="w-16 text-gray-200" />
          </div>
        </div>
      </div>
    );

  const state = spark.state;

  if (state === SparkState.SENDING)
    return (
      <div className="flex flex-col gap-8 rounded-16 bg-gray-50 p-16">
        <div className="flex items-center gap-8">
          <GradientIcon type="aiMessage" className="w-16" />
          <div className="text-16 font-700 text-gray-500">Spark</div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="h-[17px] w-full animate-pulse rounded-8 bg-gray-200" />
          <div className="h-[17px] w-1/3 animate-pulse rounded-8 bg-gray-200" />
        </div>
      </div>
    );

  if (state === SparkState.LOADING)
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
