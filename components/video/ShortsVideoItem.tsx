import LazyImage from '@/components/core/LazyImage';
import Pc from '@/components/core/responsive/Pc';
import { ImageUrl } from '@/utils/url.util';
import { Video, VideoSource } from '@prisma/client';
import { format } from 'date-fns';
import Link from 'next/link';

interface Props {
  video: Video;
}

export default function ShortsVideoItem({ video }: Props) {
  if (video.source !== VideoSource.YOUTUBE) throw new Error('Invalid video source');

  return (
    <Link href={`/video/${video.id}`} className="relative lg:flex lg:flex-col lg:gap-8">
      <LazyImage
        src={ImageUrl.youtubeShortsThumbnail(video.sourceId)}
        className="aspect-shorts bg-gray-100 lg:rounded-16"
      />
      <div className="absolute left-0 top-0 size-full bg-gradient-to-b from-transparent from-30% to-black-real/80 lg:hidden" />
      <div className="flex flex-col gap-4">
        <div className="absolute inset-x-8 bottom-8 line-clamp-3 text-14 font-400 text-white lg:static lg:line-clamp-2 lg:text-16 lg:text-black">
          {video.title}
        </div>
        <Pc>
          <div className="text-14 font-400 text-gray-500">{format(video.date, 'yy. MM. dd.')}</div>
        </Pc>
      </div>
    </Link>
  );
}

export function ShortsVideoItemPlaceholder() {
  return (
    <div className="relative animate-pulse lg:flex lg:flex-col lg:gap-8">
      <div className="aspect-shorts bg-gray-100 lg:rounded-16" />
      <div className="absolute left-0 top-0 size-full bg-gradient-to-b from-transparent from-30% to-black-real/80 lg:hidden" />
      <Pc>
        <div className="h-[17px] w-full rounded-4 bg-gray-100" />
      </Pc>
    </div>
  );
}
