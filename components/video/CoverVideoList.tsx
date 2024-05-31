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
    <div className="flex flex-col gap-18">
      <MemberMenu selected={member} onSelect={handleMemberSelect} />
      {videos.isFetching ? (
        <div className="flex flex-col gap-16 px-24 pb-24">
          <CoverVideoItemPlaceholder />
          <CoverVideoItemPlaceholder />
          <CoverVideoItemPlaceholder />
        </div>
      ) : videos.data.length > 0 ? (
        <div className="flex flex-col gap-16 px-24 pb-24">
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
