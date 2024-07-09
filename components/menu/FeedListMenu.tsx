import Icon from '@/components/core/Icon';
import Translate from '@/components/core/Translate';
import FeedItem from '@/components/feed/FeedItem';
import FeedListMenuGrid from '@/components/menu/FeedListMenuGrid';
import { FeedService } from '@/services/feed.service';
import { FeedTypes } from '@/utils/feed.util';
import Link from 'next/link';

export default async function FeedListMenu() {
  const feeds = await FeedService.getFeeds(
    { cursor: null, limit: 12 },
    { date: null, direction: 'desc', types: FeedTypes }
  );

  return (
    <div className="flex flex-col gap-12">
      <Link href={`/discover`} className="flex items-center gap-10 self-start">
        <Icon type="discover" className="size-20 text-primary-500 lg:size-20" />
        <div className="shrink-0 text-22 font-700 text-primary-500 lg:text-24">Discover</div>
      </Link>
      <FeedListMenuGrid>
        {feeds.items.map(feed => (
          <div key={feed.id} className="shrink-0 rounded-16 bg-gray-50 p-16">
            <FeedItem feed={feed} />
          </div>
        ))}
      </FeedListMenuGrid>
      <Link href={`/discover`} className="-m-16 flex items-center gap-8 self-center p-16">
        <div className="shrink-0 text-18 font-600 text-gray-500">
          <Translate>$view_all</Translate>
        </div>
        <Icon type="right" className="size-14 shrink-0 text-gray-500" />
      </Link>
    </div>
  );
}
