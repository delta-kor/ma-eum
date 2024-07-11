import LazyImage from '@/components/core/LazyImage';
import PastRelativeTime from '@/components/core/PastRelativeTime';
import { getFeedUrl } from '@/utils/feed.util';
import { VividMedia } from '@/utils/vivid.util';
import { Feed } from '@prisma/client';

interface Props {
  feed: Feed;
}

export default function SnsFeedItem({ feed }: Props) {
  const link = getFeedUrl(feed);

  const media = feed.media as VividMedia[];
  const thumbnails = media
    .map(selectedMedia =>
      selectedMedia.type === 'image' ? selectedMedia.url : selectedMedia.thumbnail
    )
    .slice(0, 4);

  const isSingle = thumbnails.length === 1;
  const isTriple = thumbnails.length === 3;
  const isOverflow = media.length > 4;

  return (
    <a
      href={link}
      target="_blank"
      className="flex w-[256px] shrink-0 snap-start flex-col overflow-hidden rounded-16 border-2 border-gray-50 bg-gray-50"
    >
      <div
        data-single={isSingle}
        className="grid aspect-square grid-cols-2 gap-2 data-[single=true]:grid-cols-1"
      >
        {thumbnails.map((thumbnail, index) => (
          <div
            key={thumbnail}
            data-full={isTriple && index === 0}
            className="relative size-full data-[full=true]:col-span-full"
          >
            <LazyImage src={thumbnail} className="size-full" />
            {isOverflow && index === 3 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black-real/70">
                <div className="text-24 font-500 text-white">+{media.length - 4}</div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex grow flex-col justify-between gap-4 px-16 py-12">
        <div className="line-clamp-2 text-16 font-400 text-black">{feed.title.slice(0, 100)}</div>
        <div suppressHydrationWarning className="text-14 font-600 text-gray-500">
          <PastRelativeTime date={feed.date} />
        </div>
      </div>
    </a>
  );
}
