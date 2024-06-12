'use client';

import EndItems from '@/components/core/EndItems';
import FeedItem from '@/components/feed/FeedItem';
import { trpc } from '@/hooks/trpc';
import { PaginationResult } from '@/utils/pagination.util';
import { Feed } from '@prisma/client';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface Props {
  preloadedFeeds: PaginationResult<Feed>;
}

export default function FeedList({ preloadedFeeds }: Props) {
  const { inView, ref } = useInView({
    threshold: 0,
  });

  const feeds = trpc.feed.getFeeds.useInfiniteQuery(
    {},
    {
      getNextPageParam: lastPage => lastPage.nextCursor || undefined,
      initialData: { pageParams: [null], pages: [preloadedFeeds] },
      refetchOnMount: false,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (inView && feeds.hasNextPage && !feeds.isFetching) {
      void feeds.fetchNextPage();
    }
  }, [inView]);

  const items =
    feeds.data?.pages
      .map(page => page.items)
      .flat()
      .filter(item => item.media.length > 0) || [];
  const isLoading = feeds.isFetching && !feeds.isFetchingNextPage;

  const placeholder = <></>;

  return (
    <div className="flex flex-col gap-16 lg:grid lg:grid-cols-3">
      {isLoading ? (
        placeholder
      ) : items.length > 0 ? (
        <>
          {items.map(item => (
            <div key={item.id} className="flex flex-col justify-between gap-24">
              <FeedItem feed={item} />
              <div className="-mx-24 h-2 bg-gray-100" />
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
  );
}
