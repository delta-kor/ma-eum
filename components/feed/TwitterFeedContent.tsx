import { VividImageMedia, VividMedia } from '@/utils/vivid.util';
import { Feed } from '@prisma/client';
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

interface Props {
  feed: Feed;
}

export default function TwitterFeedContent({ feed }: Props) {
  const media = feed.media as VividMedia[];
  const images = media.filter(media => media.type === 'image') as VividImageMedia[];
  const videos = media.filter(media => media.type === 'video');

  return (
    <div>
      <motion.div layout="size" className="overflow-hidden rounded-16 bg-gray-100">
        <LazyLoadImage
          alt={feed.sourceId}
          effect="opacity"
          src={[...images, ...videos][0].url!}
          className="size-full"
        />
      </motion.div>
    </div>
  );
}
