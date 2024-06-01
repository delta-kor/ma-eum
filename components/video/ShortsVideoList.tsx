'use client';

import NoItems from '@/components/core/NoItems';
import ShortsVideoItem, { ShortsVideoItemPlaceholder } from '@/components/video/ShortsVideoItem';
import { trpc } from '@/hooks/trpc';
import { PaginationResult } from '@/utils/pagination.util';
import { Video } from '@prisma/client';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface Props {
  preloadedVideos: PaginationResult<Video>;
}

export default function ShortsVideoList({ preloadedVideos }: Props) {
  const { inView, ref } = useInView({
    threshold: 0,
  });

  const videos = trpc.video.getShortsVideos.useInfiniteQuery(
    {},
    {
      getNextPageParam: lastPage => lastPage.nextCursor || undefined,
      initialData: { pageParams: [null], pages: [preloadedVideos] },
      refetchOnMount: false,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (inView && videos.hasNextPage && !videos.isFetching) {
      void videos.fetchNextPage();
    }
  }, [inView]);

  const items = videos.data?.pages.map(page => page.items).flat() || [];

  return (
    <div className="flex flex-col gap-18">
      {videos.isFetching && !videos.isFetchingNextPage ? (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))]">
          <ShortsVideoItemPlaceholder />
          <ShortsVideoItemPlaceholder />
          <ShortsVideoItemPlaceholder />
          <ShortsVideoItemPlaceholder />
          <ShortsVideoItemPlaceholder />
          <ShortsVideoItemPlaceholder />
        </div>
      ) : items.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] items-center">
          {items.map(video => (
            <ShortsVideoItem key={video.id} video={video} />
          ))}
          {videos.isFetchingNextPage && (
            <>
              <ShortsVideoItemPlaceholder />
              <ShortsVideoItemPlaceholder />
              <ShortsVideoItemPlaceholder />
              <ShortsVideoItemPlaceholder />
              <ShortsVideoItemPlaceholder />
              <ShortsVideoItemPlaceholder />
            </>
          )}
          {videos.hasNextPage && <div ref={ref} className="size-1" />}
        </div>
      ) : (
        <NoItems />
      )}
    </div>
  );
}
