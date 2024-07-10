'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';

interface Props {
  children: ReactNode[];
}

export default function FeedListMenuGrid({ children }: Props) {
  const [colsCount, setColsCount] = useState(3);
  const gridRef = useRef<HTMLDivElement>(null);

  const gap = 16;
  const minWidth = 280;

  useEffect(() => {
    handleResize();

    const resizeObserver = new ResizeObserver(handleResize);
    const element = gridRef.current;
    if (element) resizeObserver.observe(element);
    return () => resizeObserver.disconnect();
  }, []);

  function handleResize() {
    const element = gridRef.current;
    if (!element) return;

    const width = element.clientWidth;
    const newColsCount = Math.floor(width / (minWidth + gap));
    setColsCount(newColsCount || 1);
  }

  const cols: ReactNode[][] = [];
  for (let i = 0; i < colsCount; i++) {
    cols.push([]);
  }

  let index: number = 0;
  for (const item of children) {
    cols[index % colsCount].push(item);
    index++;
  }

  return (
    <div ref={gridRef} className="flex gap-16">
      {cols.map((col, i) => (
        <div key={i} className="flex min-w-0 flex-1 flex-col gap-16 overflow-hidden">
          {col}
        </div>
      ))}
    </div>
  );
}
