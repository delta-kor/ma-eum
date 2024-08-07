import Icon from '@/components/core/Icon';
import useSpark from '@/hooks/spark';
import { SparkState } from '@/utils/spark.util';
import { useRef } from 'react';

export default function SparkInput() {
  const spark = useSpark();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSendButtonClick() {
    handleSend();
  }

  function handleSend() {
    const input = inputRef.current;
    if (!input) return false;
    if (!isIdle) return false;

    const prompt = input.value.trim();
    if (prompt.length === 0 || prompt.length > 200) return false;

    spark.send(prompt);
    input.blur();
    input.value = '';
  }

  function handleReset() {
    spark.reset();
  }

  const hasHistory = spark.history.length > 0;
  const isIdle = spark.state === SparkState.IDLE;

  return (
    <div className="fixed inset-x-0 bottom-[63px] border-t-1 border-gray-100 bg-white/30 p-16 backdrop-blur-lg lg:bottom-0 lg:border-none lg:bg-white lg:p-0">
      <div className="mx-auto flex w-full max-w-screen-lg flex-col gap-8 border-gray-100 lg:mb-32 lg:rounded-16 lg:border-1 lg:p-8">
        <div className="scrollbar-hide -mx-24 flex items-center gap-8 overflow-x-scroll px-24">
          {hasHistory && (
            <div
              onClick={handleReset}
              className="jelly flex shrink-0 cursor-pointer select-none items-center gap-8 rounded-16 bg-gray-50 px-12 py-8 hover:scale-105"
            >
              <Icon type="trash" className="w-16 shrink-0 text-gray-500" />
              <div className="shrink-0 text-16 font-500 text-gray-500">Reset</div>
            </div>
          )}
          <div className="jelly flex shrink-0 cursor-pointer select-none items-center gap-8 rounded-16 bg-gray-50 px-12 py-8 hover:scale-105">
            <Icon type="book" className="w-16 shrink-0 text-gray-500" />
            <div className="shrink-0 text-16 font-500 text-gray-500">Teach Spark</div>
          </div>
          {!hasHistory && (
            <div className="jelly flex shrink-0 cursor-pointer select-none items-center gap-8 rounded-16 bg-gray-50 px-12 py-8 hover:scale-105">
              <Icon type="warning" className="w-16 shrink-0 text-gray-500" />
              <div className="shrink-0 text-16 font-500 text-gray-500">Disclaimer</div>
            </div>
          )}
        </div>
        <div className="flex items-center gap-8 rounded-16 bg-gray-50 pr-16">
          <input
            ref={inputRef}
            maxLength={200}
            placeholder="Type your message"
            type="text"
            onKeyDown={e => {
              if (e.key === 'Enter') handleSend();
            }}
            className="min-w-0 grow bg-transparent py-16 pl-20 text-16 font-500 text-black outline-none placeholder:text-gray-500"
          />
          <div
            onClick={handleSendButtonClick}
            className="jelly -m-8 shrink-0 cursor-pointer p-8 hover:scale-105"
          >
            <Icon
              data-idle={isIdle}
              type={isIdle ? 'send' : 'spinner'}
              className="w-16 shrink-0 text-primary-500 data-[idle=false]:animate-spin data-[idle=false]:text-gray-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
