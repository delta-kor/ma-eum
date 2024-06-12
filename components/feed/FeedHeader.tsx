import { getFeedHeader, getFeedType } from '@/utils/feed.util';
import { Feed } from '@prisma/client';

interface Props {
  feed: Feed;
}

export default function FeedHeader({ feed }: Props) {
  const header = getFeedHeader(feed)[0];
  const type = getFeedType(feed);

  return (
    <div className="flex h-36 items-center justify-between">
      <div className="text-16 font-700 text-black">{header}</div>
      <div className="text-16 font-600 text-gray-500">{type}</div>
    </div>
  );
}
