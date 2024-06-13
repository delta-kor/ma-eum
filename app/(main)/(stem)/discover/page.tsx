import FeedList from '@/components/feed/FeedList';
import { FeedService } from '@/services/feed.service';

export const revalidate = 0;

export default async function DiscoverPage() {
  const feedsData = await FeedService.getFeeds({ cursor: null, limit: 15 });

  return (
    <div className="px-24 pb-24">
      <div className="mx-auto mt-artistic-header-height-md w-full max-w-screen-lg lg:mt-artistic-header-height-lg lg:pt-32">
        <FeedList preloadedFeeds={feedsData} />
      </div>
    </div>
  );
}
