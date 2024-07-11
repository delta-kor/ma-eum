import LazyImage from '@/components/core/LazyImage';
import PastRelativeTime from '@/components/core/PastRelativeTime';
import { VividMedia } from '@/utils/vivid.util';
import { Feed } from '@prisma/client';
import Link from 'next/link';

interface Props {
  feed: Feed;
}

export default function SnsFeedItem({ feed }: Props) {
  const media = feed.media as VividMedia[];
  const selectedMedia = media[0];
  const selectedMediaThumbnail =
    selectedMedia.type === 'image' ? selectedMedia.url : selectedMedia.thumbnail;

  return (
    <Link
      href={`/discover`}
      className="flex w-[256px] shrink-0 snap-start flex-col overflow-hidden rounded-16 border-2 border-gray-50 bg-gray-50"
    >
      <LazyImage src={selectedMediaThumbnail} className="aspect-video" />
      <div className="flex grow flex-col justify-between gap-4 px-16 py-12">
        <div className="line-clamp-2 text-16 font-400 text-black">{feed.title}</div>
        <div suppressHydrationWarning className="text-14 font-600 text-gray-500">
          <PastRelativeTime date={feed.date} />
        </div>
      </div>
    </Link>
  );
}
