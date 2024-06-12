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

  const items = feeds.data?.pages.map(page => page.items).flat() || [];
  const isLoading = feeds.isFetching && !feeds.isFetchingNextPage;

  const placeholder = <></>;

  return (
    <div className="flex flex-col gap-16">
      {isLoading ? (
        placeholder
      ) : items.length > 0 ? (
        <>
          {items.map(item => (
            <FeedItem key={item.id} feed={item} />
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
