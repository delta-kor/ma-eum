import FeedList from '@/components/feed/FeedList';
import { FeedService } from '@/services/feed.service';
import { FeedTypes } from '@/utils/feed.util';

export const revalidate = 0;

export default async function DiscoverPage() {
  const feeds = await FeedService.getFeeds(
    { cursor: null, limit: 15 },
    { date: null, direction: 'desc', types: FeedTypes }
  );

  return (
    <div className="px-24 pb-24">
      <div className="mx-auto mt-artistic-header-height-md w-full max-w-screen-lg lg:mt-artistic-header-height-lg lg:pt-16">
        <FeedList preloadedFeeds={feeds} />
      </div>
    </div>
  );
}
