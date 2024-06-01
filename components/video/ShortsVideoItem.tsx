import LazyImage from '@/components/core/LazyImage';
import { ImageUrl } from '@/utils/url.util';
import { Video } from '@prisma/client';

interface Props {
  video: Video;
}

export default function ShortsVideoItem({ video }: Props) {
  return (
    <div className="relative">
      <LazyImage
        src={ImageUrl.youtubeShortsThumbnail(video.sourceId)}
        className="aspect-shorts bg-gray-100"
      />
      <div className="absolute left-0 top-0 size-full bg-gradient-to-b from-transparent from-30% to-black-real/80" />
      <div className="absolute inset-x-8 bottom-8 line-clamp-3 text-14 font-400 text-white">
        {video.title}
      </div>
    </div>
  );
}

export function ShortsVideoItemPlaceholder() {
  return (
    <div className="relative animate-pulse">
      <div className="aspect-shorts bg-gray-100" />
      <div className="absolute left-0 top-0 size-full bg-gradient-to-b from-transparent from-30% to-black-real/80" />
    </div>
  );
}
