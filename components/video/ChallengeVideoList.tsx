'use client';

import EndItems from '@/components/core/EndItems';
import NoItems from '@/components/core/NoItems';
import MemberMenu from '@/components/menu/MemberMenu';
import ChallengeVideoItem, {
  ChallengeVideoItemPlaceholder,
} from '@/components/video/ChallengeVideoItem';
import useQuery from '@/hooks/query';
import { trpc } from '@/hooks/trpc';
import { Member, sanitizeMember } from '@/utils/member.util';
import { PaginationResult } from '@/utils/pagination.util';
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
  const query = useQuery();

  const initialMember = sanitizeMember(query.get('member'));
  const [member, setMember] = useState<Member | null>(initialMember);
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
  const isLoading = videos.isFetching && !videos.isFetchingNextPage;

  const placeholder = (
    <>
      <ChallengeVideoItemPlaceholder />
      <ChallengeVideoItemPlaceholder />
      <ChallengeVideoItemPlaceholder />
      <ChallengeVideoItemPlaceholder />
    </>
  );

  return (
    <div className="flex flex-col gap-18 lg:mx-auto lg:grid lg:max-w-screen-lgx lg:grid-cols-[160px_1fr] lg:items-start lg:gap-16 lg:px-24">
      <MemberMenu selected={member} onSelect={handleMemberSelect} />
      <div className="flex flex-col gap-16 px-24 pb-24 lg:grid lg:grid-cols-2 lg:px-0">
        {isLoading ? (
          placeholder
        ) : items.length > 0 ? (
          <>
            {items.map(video => (
              <Suspense key={video.id} fallback={<ChallengeVideoItemPlaceholder />}>
                <ChallengeVideoItem video={video} />
              </Suspense>
            ))}
            {videos.isFetchingNextPage && placeholder}
            {videos.hasNextPage ? (
              <div ref={ref} className="col-span-full h-8" />
            ) : (
              <div className="col-span-full">
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
  );
}
