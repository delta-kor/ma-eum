import { VividMedia } from '@/utils/vivid.util';
import { Feed } from '@prisma/client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

interface Props {
  feed: Feed;
}

export default function TwitterFeedContent({ feed }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [mediaIndex, setMediaIndex] = useState<number>(0);

  const media = feed.media as VividMedia[];
  const selectedMedia = media[mediaIndex];
  const selectedMediaThumbnail =
    selectedMedia.type === 'image' ? selectedMedia.url : selectedMedia.thumbnail;

  function handleLoad() {
    setLoaded(true);
  }

  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-col gap-8">
        <motion.div
          data-loaded={loaded}
          layout
          className="relative overflow-hidden rounded-16 bg-gray-100 data-[loaded=false]:aspect-video"
        >
          <LazyLoadImage
            alt={feed.sourceId}
            effect="opacity"
            src={selectedMediaThumbnail}
            threshold={1000}
            wrapperClassName="!block size-full"
            onLoad={handleLoad}
            className="block size-full object-cover"
          />
        </motion.div>
        <div className="flex items-center gap-4 self-center">
          {media.map((item, index) => (
            <div
              key={index}
              data-active={index === mediaIndex}
              className="size-6 rounded-full bg-gray-200 data-[active=true]:bg-primary-500"
            />
          ))}
        </div>
      </div>
      <div className="whitespace-pre-line text-16 font-400 text-black">{feed.title}</div>
    </div>
  );
}
