'use client';

import EndItems from '@/components/core/EndItems';
import NoItems from '@/components/core/NoItems';
import MemberMenu from '@/components/menu/MemberMenu';
import ChallengeVideoItem, {
  ChallengeVideoItemPlaceholder,
} from '@/components/video/ChallengeVideoItem';
import { trpc } from '@/hooks/trpc';
import { PaginationResult } from '@/utils/pagination.util';
import { Member } from '@/utils/video.util';
import { Video } from '@prisma/client';
import { Suspense, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface Props {
  preloadedVideos: PaginationResult<Video>;
}

export default function ChallengeVideoList({ preloadedVideos }: Props) {
  const { inView, ref } = useInView({
    threshold: 0,
  });
  const [member, setMember] = useState<Member | null>(null);
  const [index, setIndex] = useState<number>(0);

  const videos = trpc.video.getChallengeVideos.useInfiniteQuery(
    { member },
    {
      getNextPageParam: lastPage => lastPage.nextCursor || undefined,
      initialData: { pageParams: [null], pages: [preloadedVideos] },
      queryHash: index.toString(),
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

  function handleMemberSelect(member: Member | null) {
    setMember(member);
    setIndex(index => index + 1);
  }

  const items = videos.data?.pages.map(page => page.items).flat() || [];

  return (
    <div className="flex flex-col gap-18 lg:mx-auto lg:grid lg:max-w-screen-lgx lg:grid-cols-[160px_1fr] lg:items-start lg:gap-16 lg:px-24">
      <MemberMenu selected={member} onSelect={handleMemberSelect} />
      {videos.isFetching && !videos.isFetchingNextPage ? (
        <div className="flex flex-col gap-16 px-24 pb-24 lg:grid lg:grid-cols-2 lg:px-0">
          <ChallengeVideoItemPlaceholder />
          <ChallengeVideoItemPlaceholder />
          <ChallengeVideoItemPlaceholder />
          <ChallengeVideoItemPlaceholder />
        </div>
      ) : items.length > 0 ? (
        <div className="flex flex-col gap-16 px-24 pb-24 lg:grid lg:grid-cols-2 lg:px-0">
          {items.map(video => (
            <Suspense key={video.id} fallback={<ChallengeVideoItemPlaceholder />}>
              <ChallengeVideoItem video={video} />
            </Suspense>
          ))}
          {videos.isFetchingNextPage && (
            <>
              <ChallengeVideoItemPlaceholder />
              <ChallengeVideoItemPlaceholder />
              <ChallengeVideoItemPlaceholder />
              <ChallengeVideoItemPlaceholder />
            </>
          )}
          {videos.hasNextPage ? (
            <div ref={ref} className="size-1" />
          ) : (
            <div className="lg:col-span-2">
              <EndItems />
            </div>
          )}
        </div>
      ) : (
        <NoItems />
      )}
    </div>
  );
}
