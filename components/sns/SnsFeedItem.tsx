import PastRelativeTime from '@/components/core/PastRelativeTime';
import SnsThumbnailGrid from '@/components/sns/SnsThumbnailGrid';
import { getFeedUrl } from '@/utils/feed.util';
import { VividMedia } from '@/utils/vivid.util';
import { Feed } from '@prisma/client';

interface Props {
  feed: Feed;
}

export default function SnsFeedItem({ feed }: Props) {
  const link = getFeedUrl(feed);

  const media = feed.media as VividMedia[];
  const thumbnails = media.map(selectedMedia =>
    selectedMedia.type === 'image' ? selectedMedia.url : selectedMedia.thumbnail
  );

  return (
    <div className="flex w-[256px] shrink-0 snap-start flex-col overflow-hidden rounded-16 border-2 border-gray-50 bg-gray-50 transition-colors hover:border-gray-100 hover:bg-gray-100">
      <SnsThumbnailGrid thumbnails={thumbnails} />
      <a
        href={link}
        target="_blank"
        className="flex grow flex-col justify-between gap-4 px-16 py-12"
      >
        <div className="line-clamp-2 text-16 font-400 text-black">{feed.title.slice(0, 100)}</div>
        <div suppressHydrationWarning className="text-14 font-600 text-gray-500">
          <PastRelativeTime date={feed.date} />
        </div>
      </a>
    </div>
  );
}
