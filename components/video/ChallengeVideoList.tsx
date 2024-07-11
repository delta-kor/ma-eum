'use client';

import EndItems from '@/components/core/EndItems';
import NoItems from '@/components/core/NoItems';
import Pc from '@/components/core/responsive/Pc';
import MemberMenu from '@/components/menu/MemberMenu';
import VideoListInfoMenu from '@/components/menu/VideoListInfoMenu';
import ChallengeVideoItem, {
  ChallengeVideoItemPlaceholder,
} from '@/components/video/ChallengeVideoItem';
import useQuery from '@/hooks/query';
import { trpc } from '@/hooks/trpc';
import { ExtendedVideo } from '@/services/video.service';
import { Member, getSanitizedMember } from '@/utils/member.util';
import { PaginationResult } from '@/utils/pagination.util';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface Props {
  preloadedVideos: PaginationResult<ExtendedVideo>;
}

export default function ChallengeVideoList({ preloadedVideos }: Props) {
  const { inView, ref } = useInView({
    rootMargin: '200px',
    threshold: 0,
  });
  const query = useQuery();

  const initialMember = getSanitizedMember(query.get('member'));
  const [member, setMember] = useState<Member | null>(initialMember);
  const [index, setIndex] = useState<number>(0);

  const isDefaultMember = member === null;
  const videos = trpc.video.getChallengeVideos.useInfiniteQuery(
    { member },
    {
      getNextPageParam: lastPage => lastPage.nextCursor || undefined,
      initialData: { pageParams: [null], pages: [preloadedVideos] },
      queryHash: index.toString(),
      refetchOnMount: !isDefaultMember,
      refetchOnReconnect: false,
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
  const isLoading =
    videos.isLoading || (videos.isFetching && index !== 0 && !videos.isFetchingNextPage);

  const placeholder = (
    <>
      <ChallengeVideoItemPlaceholder />
      <ChallengeVideoItemPlaceholder />
      <ChallengeVideoItemPlaceholder />
      <ChallengeVideoItemPlaceholder />
    </>
  );

  return (
    <div className="flex flex-col gap-16 lg:mx-auto lg:max-w-screen-lgx lg:px-24">
      <Pc className="px-24 pt-8 lg:px-0">
        <VideoListInfoMenu type="challenge" />
      </Pc>
      <div className="flex flex-col gap-18 lg:grid lg:grid-cols-[160px_1fr] lg:items-start lg:gap-16">
        <MemberMenu selected={member} onSelect={handleMemberSelect} />
        <div className="flex flex-col gap-16 px-24 pb-24 lg:grid lg:grid-cols-2 lg:px-0">
          {isLoading ? (
            placeholder
          ) : items.length > 0 ? (
            <>
              {items.map(video => (
                <ChallengeVideoItem key={video.id} video={video} />
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
    </div>
  );
}
