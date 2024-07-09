import FeedItem from '@/components/feed/FeedItem';
import FeedListMenuCarousel from '@/components/menu/FeedListMenuCarousel';
import { FeedService } from '@/services/feed.service';
import { FeedTypes } from '@/utils/feed.util';

export default async function FeedListMenu() {
  const feeds = await FeedService.getFeeds(
    { cursor: null, limit: 10 },
    { date: null, direction: 'desc', types: FeedTypes }
  );

  return (
    <FeedListMenuCarousel>
      {feeds.items.map(feed => (
        <div key={feed.id} className="w-[280px] shrink-0 snap-start rounded-16 bg-gray-50 p-16">
          <FeedItem feed={feed} />
        </div>
      ))}
    </FeedListMenuCarousel>
  );
}
