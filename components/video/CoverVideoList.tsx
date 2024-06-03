'use client';

import NoItems from '@/components/core/NoItems';
import MemberMenu from '@/components/menu/MemberMenu';
import CoverVideoItem, { CoverVideoItemPlaceholder } from '@/components/video/CoverVideoItem';
import { trpc } from '@/hooks/trpc';
import { Member } from '@/utils/video.util';
import { Video } from '@prisma/client';
import { useState } from 'react';

interface Props {
  preloadedVideos: Video[];
}

export default function CoverVideoList({ preloadedVideos }: Props) {
  const [member, setMember] = useState<Member | null>(null);

  const videos = trpc.video.getCoverVideos.useQuery(
    { member },
    {
      initialData: preloadedVideos,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  function handleMemberSelect(member: Member | null) {
    setMember(member);
  }

  return (
    <div className="flex flex-col gap-18 lg:mx-auto lg:grid lg:max-w-screen-lgx lg:grid-cols-[160px_1fr] lg:items-start lg:gap-16 lg:px-24">
      <MemberMenu selected={member} onSelect={handleMemberSelect} />
      {videos.isFetching ? (
        <div className="flex flex-col gap-16 px-24 pb-24 lg:grid lg:grid-cols-2 lg:px-0">
          <CoverVideoItemPlaceholder />
          <CoverVideoItemPlaceholder />
          <CoverVideoItemPlaceholder />
          <CoverVideoItemPlaceholder />
        </div>
      ) : videos.data.length > 0 ? (
        <div className="flex flex-col gap-16 px-24 pb-24 lg:grid lg:grid-cols-2 lg:px-0">
          {videos.data.map(video => (
            <CoverVideoItem key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <NoItems />
      )}
    </div>
  );
}
