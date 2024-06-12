import Icon from '@/components/core/Icon';
import { VividMedia } from '@/utils/vivid.util';
import { Feed } from '@prisma/client';
import { PanInfo, motion } from 'framer-motion';
import { MouseEvent, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

interface Props {
  feed: Feed;
}

export default function TwitterFeedContent({ feed }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [mediaIndex, setMediaIndex] = useState<number>(0);
  const [isSquare, setIsSquare] = useState<boolean>(true);

  const media = feed.media as VividMedia[];
  const selectedMedia = media[mediaIndex];
  const selectedMediaThumbnail =
    selectedMedia.type === 'image' ? selectedMedia.url : selectedMedia.thumbnail;

  const isMultipleMedia = media.length > 1;

  function handleLoad() {
    setLoaded(true);
  }

  function updateMediaIndex(direction: number) {
    setIsSquare(true);
    setMediaIndex((mediaIndex + direction + media.length) % media.length);
  }

  function handlePanEnd(e: PointerEvent, info: PanInfo) {
    e.preventDefault();
    e.stopPropagation();
    const offsetX = info.offset.x;
    if (offsetX > 50) updateMediaIndex(-1);
    if (offsetX < -50) updateMediaIndex(1);
  }

  function handleImageClick(e: MouseEvent<HTMLDivElement>) {
    setIsSquare(!isSquare);
    const target = e.target as HTMLDivElement;
    setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'center' }), 200);
  }

  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-col gap-12">
        <motion.div
          data-square={isSquare}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          onClick={handleImageClick}
          onPanEnd={handlePanEnd}
          layout
          className="group relative overflow-hidden rounded-16 bg-gray-100 data-[square=false]:-mx-24 data-[square=true]:aspect-square data-[square=false]:rounded-0"
        >
          <LazyLoadImage
            key={selectedMediaThumbnail}
            alt={feed.sourceId}
            effect="opacity"
            src={selectedMediaThumbnail}
            threshold={1000}
            wrapperClassName="!block size-full"
            onLoad={handleLoad}
            className="size-full object-cover group-data-[square=true]:aspect-square"
          />
          {isMultipleMedia && (
            <div className="">
              <div
                onClick={e => updateMediaIndex(-1)}
                className="absolute left-12 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-gray-100 p-10"
              >
                <Icon type="left" className="w-12 text-black" />
              </div>
              <div
                onClick={e => {
                  e.stopPropagation();
                  updateMediaIndex(1);
                }}
                className="absolute right-12 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-gray-100 p-10"
              >
                <Icon type="right" className="w-12 text-black" />
              </div>
            </div>
          )}
        </motion.div>
        {isMultipleMedia && (
          <div className="flex items-center gap-4 self-center">
            {media.map((item, index) => (
              <div
                key={index}
                data-active={index === mediaIndex}
                className="size-6 rounded-full bg-gray-200 data-[active=true]:bg-primary-500"
              />
            ))}
          </div>
        )}
      </div>
      <div className="whitespace-pre-line text-16 font-400 text-black">{feed.title}</div>
    </div>
  );
}
