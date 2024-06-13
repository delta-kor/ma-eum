import FeedHeader from '@/components/feed/FeedHeader';
import TwitterFeedContent from '@/components/feed/TwitterFeedContent';
import { Feed } from '@prisma/client';

interface Props {
  feed: Feed;
}

export default function FeedItem({ feed }: Props) {
  return (
    <div className="flex flex-col gap-16">
      <FeedHeader feed={feed} />
      {<TwitterFeedContent feed={feed} />}
    </div>
  );
}
