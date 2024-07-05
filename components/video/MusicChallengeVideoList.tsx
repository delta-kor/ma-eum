'use client';

import Translate from '@/components/core/Translate';
import MusicChallengeVideoItem, {
  MusicChallengeVideoItemPlaceholder,
} from '@/components/video/MusicChallengeVideoItem';
import { trpc } from '@/hooks/trpc';
import { PerformanceMusicContext } from '@/providers/PerformanceMusicProvider';
import { Suspense, useContext, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export default function MusicChallengeVideoList() {
  const { inView, ref } = useInView({
    rootMargin: '200px',
    threshold: 0,
  });

  const selectedMusic = useContext(PerformanceMusicContext);
  const selectedMusicId = selectedMusic?.id;

  const videos = trpc.video.getChallengeVideos.useInfiniteQuery(
    { filter: { musicId: selectedMusicId }, member: null },
    {
      getNextPageParam: lastPage => lastPage.nextCursor || undefined,
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
  const isLoading = videos.isLoading;

  const placeholder = (
    <>
      {Array.from({ length: 10 }).map((_, index) => (
        <MusicChallengeVideoItemPlaceholder key={index} />
      ))}
    </>
  );

  if (!isLoading && items.length === 0) return null;

  return (
    <div className="flex flex-col gap-20">
      <div className="flex flex-col gap-12">
        <div className="text-20 font-700 text-black">
          <Translate>$challenge</Translate>
        </div>
        <div className="scrollbar-x -mx-24 -mb-16 flex gap-16 overflow-x-scroll px-24 pb-16 lg:mx-0 lg:px-0">
          {isLoading ? (
            placeholder
          ) : (
            <>
              {items.map(video => (
                <Suspense key={video.id} fallback={<MusicChallengeVideoItemPlaceholder />}>
                  <MusicChallengeVideoItem video={video} />
                </Suspense>
              ))}
              {videos.hasNextPage && <div ref={ref} className="size-8" />}
            </>
          )}
        </div>
      </div>
      <div className="h-1 self-stretch bg-gray-100 lg:bg-transparent" />
    </div>
  );
}
