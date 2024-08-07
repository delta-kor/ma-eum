'use client';

import Icon from '@/components/core/Icon';
import PastRelativeTime from '@/components/core/PastRelativeTime';
import FeedExpandedView from '@/components/feed/FeedExpandedView';
import FeedText from '@/components/feed/FeedText';
import useImageLoaded from '@/hooks/image-loaded';
import { getFeedUrl, getSanitizedFeedContent } from '@/utils/feed.util';
import { VividMedia } from '@/utils/vivid.util';
import { Feed } from '@prisma/client';
import { PanInfo, motion } from 'framer-motion';
import { MouseEvent, useState } from 'react';
import 'react-lazy-load-image-component/src/effects/opacity.css';

interface Props {
  feed: Feed;
}

export default function FeedContent({ feed }: Props) {
  const [mediaIndex, setMediaIndex] = useState<number>(0);
  const [isHighlighted, setIsHighlighted] = useState<boolean>(false);

  const media = feed.media as VividMedia[];
  const selectedMedia = media[mediaIndex];
  const selectedMediaThumbnail =
    selectedMedia.type === 'image' ? selectedMedia.url : selectedMedia.thumbnail;

  const [imageRef, isLoaded, handleImageLoad] = useImageLoaded(selectedMediaThumbnail);

  const hasMultipleMedia = media.length > 1;
  const isVideoMedia = selectedMedia.type === 'video';
  const content = getSanitizedFeedContent(feed);

  function updateMediaIndex(direction: number) {
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
    e.preventDefault();
    if (!isVideoMedia) setIsHighlighted(true);
    else window.open(getFeedUrl(feed), '_blank');
  }

  return (
    <div data-highlighted={isHighlighted} className="flex flex-col gap-16">
      <div className="flex flex-col gap-12">
        <motion.div
          onClick={handleImageClick}
          onPanEnd={handlePanEnd}
          className="group relative aspect-square overflow-hidden rounded-16 bg-gray-100"
        >
          <img
            ref={imageRef}
            alt={feed.sourceId}
            data-loaded={isLoaded}
            data-video={isVideoMedia}
            loading="lazy"
            onLoad={handleImageLoad}
            className="size-full object-cover opacity-0 transition-all duration-200 hover:scale-105 data-[video=true]:cursor-pointer data-[loaded=true]:opacity-100"
          />
          {isVideoMedia && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-16">
              <Icon type="play" className="w-16 text-black" />
            </div>
          )}
          {hasMultipleMedia && (
            <div className="lg:opacity-0 lg:transition-opacity lg:duration-200 lg:group-hover:opacity-100">
              <div
                onClick={e => {
                  e.stopPropagation();
                  updateMediaIndex(-1);
                }}
                className="absolute inset-y-0 left-0 flex cursor-pointer items-center px-12"
              >
                <div className="rounded-full bg-gray-100 p-10">
                  <Icon type="left" className="w-12 text-black" />
                </div>
              </div>
              <div
                onClick={e => {
                  e.stopPropagation();
                  updateMediaIndex(1);
                }}
                className="absolute inset-y-0 right-0 flex cursor-pointer items-center px-12"
              >
                <div className="rounded-full bg-gray-100 p-10">
                  <Icon type="right" className="w-12 text-black" />
                </div>
              </div>
            </div>
          )}
        </motion.div>
        {hasMultipleMedia && (
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
      <div className="flex flex-col gap-12">
        <FeedText>{content}</FeedText>
        <div
          suppressHydrationWarning
          className="self-start rounded-8 bg-gray-100 px-8 py-4 text-14 font-500 text-gray-500"
        >
          <PastRelativeTime date={feed.date} />
        </div>
      </div>
      <FeedExpandedView
        hasMultipleMedia={hasMultipleMedia}
        open={isHighlighted}
        setOpen={setIsHighlighted}
        thumbnailUrl={selectedMediaThumbnail}
        updateMediaIndex={updateMediaIndex}
      />
    </div>
  );
}
