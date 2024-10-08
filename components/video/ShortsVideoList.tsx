'use client';

import EndItems from '@/components/core/EndItems';
import NoItems from '@/components/core/NoItems';
import Pc from '@/components/core/responsive/Pc';
import VideoListInfoMenu from '@/components/menu/VideoListInfoMenu';
import ShortsVideoItem, { ShortsVideoItemPlaceholder } from '@/components/video/ShortsVideoItem';
import { trpc } from '@/hooks/trpc';
import { ExtendedVideo } from '@/services/video.service';
import { PaginationResult } from '@/utils/pagination.util';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface Props {
  preloadedVideos: PaginationResult<ExtendedVideo>;
}

export default function ShortsVideoList({ preloadedVideos }: Props) {
  const { inView, ref } = useInView({
    rootMargin: '200px',
    threshold: 0,
  });

  const videos = trpc.video.getShortsVideos.useInfiniteQuery(
    {},
    {
      getNextPageParam: lastPage => lastPage.nextCursor || undefined,
      initialData: { pageParams: [null], pages: [preloadedVideos] },
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (inView && videos.hasNextPage && !videos.isFetching) {
      void videos.fetchNextPage();
    }
  }, [inView]);

  const items = videos.data?.pages.map(page => page.items).flat() || [];
  const isLoading = videos.isFetching && !videos.isFetchingNextPage;

  const placeholder = (
    <>
      <ShortsVideoItemPlaceholder />
      <ShortsVideoItemPlaceholder />
      <ShortsVideoItemPlaceholder />
      <ShortsVideoItemPlaceholder />
      <ShortsVideoItemPlaceholder />
    </>
  );

  return (
    <div className="flex flex-col gap-16 lg:mx-auto lg:max-w-screen-lgx lg:px-24">
      <Pc className="px-24 pt-8 lg:px-0">
        <VideoListInfoMenu type="shorts" />
      </Pc>
      <div className="flex flex-col gap-18">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] lg:grid-cols-5 lg:gap-x-8 lg:gap-y-16">
          {isLoading ? (
            placeholder
          ) : items.length > 0 ? (
            <>
              {items.map(video => (
                <ShortsVideoItem key={video.id} video={video} />
              ))}
              {videos.isFetchingNextPage && placeholder}
              {videos.hasNextPage ? (
                <div ref={ref} className="col-span-full h-8" />
              ) : (
                <div className="col-span-full py-24">
                  <EndItems />
                </div>
              )}
            </>
          ) : (
            <div className="col-span-full">
              <NoItems />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
