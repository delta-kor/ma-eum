'use client';

import Icon from '@/components/core/Icon';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode, useEffect, useRef, useState } from 'react';

interface Props {
  children: ReactNode[];
}

export default function SnsCarousel({ children }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [stick, setStick] = useState<'left' | 'right' | null>(null);

  useEffect(() => {
    if (!scrollRef.current) return;

    const scroll = scrollRef.current;
    scroll.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      scroll.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function handleScrollButtonClick(direction: 'left' | 'right') {
    if (!scrollRef.current) return;

    const scroll = scrollRef.current;
    const scrollWidth = scroll.scrollWidth;
    const scrollLeft = scroll.scrollLeft;
    const clientWidth = scroll.clientWidth;
    const scrollSize = scrollWidth - clientWidth;

    const scrollAmount = clientWidth * (3 / 4);

    if (direction === 'left') scroll.scrollLeft = Math.max(scrollLeft - scrollAmount, 0);
    if (direction === 'right') scroll.scrollLeft = Math.min(scrollLeft + scrollAmount, scrollSize);
  }

  function handleScroll() {
    if (!scrollRef.current) return;

    const scroll = scrollRef.current;
    const scrollWidth = scroll.scrollWidth;

    if (scroll.scrollLeft < 16) setStick('left');
    else if (scroll.scrollLeft + scroll.clientWidth + 16 >= scrollWidth) setStick('right');
    else setStick(null);
  }

  console.log(stick);

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="scrollbar-hide -mx-24 flex snap-x snap-mandatory scroll-px-24 gap-16 overflow-x-scroll scroll-smooth px-24 lg:mx-0 lg:scroll-px-0 lg:px-0"
      >
        {children}
      </div>
      <div className="hidden pointer:block">
        <AnimatePresence>
          {stick !== 'left' && (
            <motion.div
              key="left"
              animate={{ opacity: 1, zoom: 1 }}
              exit={{ opacity: 0, zoom: 0 }}
              initial={{ opacity: 0, zoom: 0 }}
              onClick={() => handleScrollButtonClick('left')}
              className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-white p-14 shadow-gray-500 drop-shadow-lg"
            >
              <Icon type="left" className="w-14 text-gray-500" />
            </motion.div>
          )}
          {stick !== 'right' && (
            <motion.div
              key="right"
              animate={{ opacity: 1, zoom: 1 }}
              exit={{ opacity: 0, zoom: 0 }}
              initial={{ opacity: 0, zoom: 0 }}
              onClick={() => handleScrollButtonClick('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 cursor-pointer rounded-full bg-white p-14 shadow-gray-500 drop-shadow-lg"
            >
              <Icon type="right" className="w-14 text-gray-500" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
