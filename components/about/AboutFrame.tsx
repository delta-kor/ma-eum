'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';

const LazyAboutContent = dynamic(() => import('@/components/about/AboutContent'), { ssr: false });

export default function AboutFrame() {
  useEffect(() => {
    // change background color
    document.body.style.backgroundColor = 'black';

    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <div className="fixed left-0 top-0 h-dvh w-dvw overflow-hidden md:bg-black/15 md:p-48">
      <div className="relative mx-auto h-full overflow-hidden bg-black-real text-white md:aspect-shorts-full md:rounded-16">
        <LazyAboutContent />
      </div>
    </div>
  );
}
