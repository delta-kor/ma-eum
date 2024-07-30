'use client';

import AboutContent from '@/components/about/AboutContent';
import { useEffect } from 'react';

export default function AboutFrame() {
  useEffect(() => {
    // change background color
    document.body.style.backgroundColor = 'black';

    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <div className="fixed left-0 top-0 h-dvh w-dvw overflow-hidden md:p-48 lg:bg-black/15">
      <div className="relative mx-auto h-full overflow-hidden bg-black-real text-white md:aspect-shorts-full md:rounded-16">
        <AboutContent />
      </div>
    </div>
  );
}
