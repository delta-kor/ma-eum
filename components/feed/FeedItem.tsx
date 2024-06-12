import FeedHeader from '@/components/feed/FeedHeader';
import TwitterFeedContent from '@/components/feed/TwitterFeedContent';
import { Feed, FeedType } from '@prisma/client';

interface Props {
  feed: Feed;
}

export default function FeedItem({ feed }: Props) {
  return (
    <div className="flex flex-col gap-12">
      <FeedHeader feed={feed} />
      {feed.type === FeedType.TWITTER && <TwitterFeedContent feed={feed} />}
    </div>
  );
}
