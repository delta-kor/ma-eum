import FeedList from '@/components/feed/FeedList';
import { FeedService } from '@/services/feed.service';
import { getSanitizedFeedDirection, getSanitizedFeedType } from '@/utils/feed.util';
import MetaUtil from '@/utils/meta.util';
import { SearchParams } from '@/utils/url.util';
import { Metadata } from 'next';

export const revalidate = 0;

interface Props {
  searchParams: SearchParams;
}

export default async function DiscoverPage({ searchParams }: Props) {
  const feedTypes = getSanitizedFeedType(searchParams.feed || null);
  const direction = getSanitizedFeedDirection(searchParams.direction || null);

  const feeds = await FeedService.getFeeds(
    { cursor: null, limit: 15 },
    { date: null, direction: direction, types: feedTypes }
  );

  return (
    <div className="px-24 pb-24">
      <div className="mx-auto mt-artistic-header-height-md w-full max-w-screen-lg lg:mt-artistic-header-height-lg lg:pt-16">
        <FeedList preloadedFeeds={feeds} />
      </div>
    </div>
  );
}

export function generateMetadata(): Metadata {
  return MetaUtil.getSubpage(
    'Discover',
    'Discover the latest photos and videos of CSR(첫사랑) members, all in one place.',
    '/discover'
  );
}
