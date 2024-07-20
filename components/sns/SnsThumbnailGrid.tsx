'use client';

import LazyImage from '@/components/core/LazyImage';
import FeedExpandedView from '@/components/feed/FeedExpandedView';
import { useState } from 'react';

interface Props {
  thumbnails: string[];
}

export default function SnsThumbnailGrid({ thumbnails }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const isSingle = thumbnails.length === 1;
  const isTriple = thumbnails.length === 3;
  const isOverflow = thumbnails.length > 4;

  const slicedThumbnails = thumbnails.slice(0, 4);
  const currentThumbnail = thumbnails[currentIndex];

  function handleClick(index: number) {
    setCurrentIndex(index);
    setOpen(true);
  }

  function updateMediaIndex(direction: number) {
    setCurrentIndex((currentIndex + direction + thumbnails.length) % thumbnails.length);
  }

  return (
    <div
      data-single={isSingle}
      className="grid aspect-square grid-cols-2 gap-2 data-[single=true]:grid-cols-1"
    >
      {slicedThumbnails.map((thumbnail, index) => (
        <div
          key={thumbnail}
          data-full={isTriple && index === 0}
          onClick={() => handleClick(index)}
          className="relative size-full data-[full=true]:col-span-full"
        >
          <LazyImage src={thumbnail} className="size-full" />
          {isOverflow && index === 3 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black-real/70">
              <div className="text-24 font-500 text-white">+{thumbnails.length - 4}</div>
            </div>
          )}
        </div>
      ))}
      <FeedExpandedView
        hasMultipleMedia={!isSingle}
        open={open}
        setOpen={setOpen}
        thumbnailUrl={currentThumbnail}
        updateMediaIndex={updateMediaIndex}
      />
    </div>
  );
}
