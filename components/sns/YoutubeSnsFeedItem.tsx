import LazyImage from '@/components/core/LazyImage';
import PastRelativeTime from '@/components/core/PastRelativeTime';
import { ImageUrl } from '@/utils/url.util';
import { Video } from '@prisma/client';
import Link from 'next/link';

interface Props {
  video: Video;
}

export default function YoutubeSnsFeedItem({ video }: Props) {
  return (
    <Link
      href={`/video/${video.id}`}
      className="flex w-[256px] shrink-0 snap-start flex-col overflow-hidden rounded-16 border-2 border-gray-50 bg-gray-50 transition-colors hover:border-gray-100 hover:bg-gray-100"
    >
      <div className="aspect-video overflow-hidden">
        <LazyImage
          alt={video.title}
          src={ImageUrl.youtubeThumbnail(video.sourceId)}
          className="aspect-video transition-transform hover:scale-105"
        />
      </div>
      <div className="flex grow flex-col justify-between gap-4 px-16 py-12">
        <div className="line-clamp-2 text-16 font-400 text-black">{video.title}</div>
        <div suppressHydrationWarning className="text-14 font-600 text-gray-500">
          <PastRelativeTime date={video.date} />
        </div>
      </div>
    </Link>
  );
}
