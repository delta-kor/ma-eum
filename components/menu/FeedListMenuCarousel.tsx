'use client';

import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

export default function FeedListMenuCarousel({ children }: Props) {
  return (
    <div className="scrollbar-hide -mx-24 flex snap-x snap-mandatory scroll-px-24 items-start gap-16 overflow-x-scroll px-24 lg:mx-0 lg:scroll-px-0 lg:px-0">
      {children}
    </div>
  );
}
