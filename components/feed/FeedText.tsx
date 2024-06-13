import Translate from '@/components/core/Translate';
import TextHighlighter from '@/components/feed/TextHighlighter';
import { useEffect, useRef, useState } from 'react';

interface Props {
  children: string;
}

export default function FeedText({ children }: Props) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isOverflowing, setIsOverflowing] = useState<boolean>(false);

  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    handleResize();

    const resizeObserver = new ResizeObserver(handleResize);
    const element = textRef.current;
    if (element) resizeObserver.observe(element);
    return () => resizeObserver.disconnect();
  }, []);

  const handleResize = () => {
    const element = textRef.current;
    if (!element) return;

    setIsOverflowing(element.scrollHeight > element.clientHeight);
  };

  return (
    <div className="flex flex-col">
      <TextHighlighter
        data-expanded={isExpanded}
        innerRef={textRef}
        className="line-clamp-5 whitespace-pre-line text-16 font-400 leading-5 text-black data-[expanded=true]:line-clamp-none"
      >
        {children}
      </TextHighlighter>
      {isOverflowing && !isExpanded && (
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="cursor-pointer text-14 font-600 text-gray-500"
        >
          <Translate>$view_all</Translate>
        </div>
      )}
    </div>
  );
}
