'use client';

import EndItems from '@/components/core/EndItems';
import FeedFilterMenu from '@/components/feed/FeedFilterMenu';
import FeedItem, { FeedItemPlaceholder } from '@/components/feed/FeedItem';
import useQuery from '@/hooks/query';
import { trpc } from '@/hooks/trpc';
import {
  FeedFilter,
  FeedTypes,
  getSanitizedFeedDirection,
  getSanitizedFeedType,
} from '@/utils/feed.util';
import { PaginationResult } from '@/utils/pagination.util';
import { Feed } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface Props {
  preloadedFeeds: PaginationResult<Feed>;
}

export default function FeedList({ preloadedFeeds }: Props) {
  const { inView, ref } = useInView({
    threshold: 0,
  });

  const query = useQuery();
  const feedTypes = getSanitizedFeedType(query.get('feed'));
  const direction = getSanitizedFeedDirection(query.get('direction'));
  const [filter, setFilter] = useState<FeedFilter>({
    date: null,
    direction: direction,
    types: feedTypes,
  });

  const isDefaultFilter = filter.types.length === FeedTypes.length && filter.direction === 'desc';
  const feeds = trpc.feed.getFeeds.useInfiniteQuery(
    {
      filter,
    },
    {
      getNextPageParam: lastPage => lastPage.nextCursor || undefined,
      initialData: { pageParams: [null], pages: [preloadedFeeds] },
      refetchOnMount: !isDefaultFilter,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (inView && feeds.hasNextPage && !feeds.isFetching) {
      void feeds.fetchNextPage();
    }
  }, [inView]);

  function handleFilterSet(filter: FeedFilter) {
    setFilter(filter);
  }

  const items =
    feeds.data?.pages
      .map(page => page.items)
      .flat()
      .filter(item => item.media.length > 0) || [];
  const isLoading = feeds.isFetching && !feeds.isFetchingNextPage;

  const placeholder = (
    <>
      <div className="flex flex-col justify-between gap-24">
        <FeedItemPlaceholder />
        <div className="-mx-24 h-2 bg-gray-100 lg:mx-0" />
      </div>
      <div className="flex flex-col justify-between gap-24">
        <FeedItemPlaceholder />
        <div className="-mx-24 h-2 bg-gray-100 lg:mx-0" />
      </div>
      <div className="flex flex-col justify-between gap-24">
        <FeedItemPlaceholder />
        <div className="-mx-24 h-2 bg-gray-100 lg:mx-0" />
      </div>
    </>
  );

  return (
    <div className="flex flex-col gap-16 lg:gap-24">
      <FeedFilterMenu filter={filter} onFilterSet={handleFilterSet} />
      <div className="-mx-24 h-2 bg-gray-100 lg:mx-0" />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-16 lg:gap-24">
        {isLoading ? (
          placeholder
        ) : items.length > 0 ? (
          <>
            {items.map(item => (
              <div key={item.id} className="flex flex-col justify-between gap-24">
                <FeedItem feed={item} />
                <div className="-mx-24 h-2 bg-gray-100 lg:mx-0" />
              </div>
            ))}
            {feeds.isFetchingNextPage && placeholder}
            {feeds.hasNextPage ? (
              <div ref={ref} className="col-span-full h-8" />
            ) : (
              <div className="col-span-full py-24">
                <EndItems />
              </div>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
