'use client';

import NoItems from '@/components/core/NoItems';
import Pc from '@/components/core/responsive/Pc';
import MemberMenu from '@/components/menu/MemberMenu';
import VideoListInfoMenu from '@/components/menu/VideoListInfoMenu';
import CoverVideoItem, { CoverVideoItemPlaceholder } from '@/components/video/CoverVideoItem';
import useQuery from '@/hooks/query';
import { trpc } from '@/hooks/trpc';
import { ExtendedVideo } from '@/services/video.service';
import { Member, getSanitizedMember } from '@/utils/member.util';
import { useState } from 'react';

interface Props {
  preloadedVideos: ExtendedVideo[];
}

export default function CoverVideoList({ preloadedVideos }: Props) {
  const query = useQuery();

  const initialMember = getSanitizedMember(query.get('member'));
  const [member, setMember] = useState<Member | null>(initialMember);
  const [isFetchingMember, setIsFetchingMember] = useState(false);

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
    setIsFetchingMember(true);
  }

  const isLoading = videos.isLoading || (videos.isFetching && isFetchingMember);

  return (
    <div className="flex flex-col gap-16 lg:mx-auto lg:max-w-screen-lgx lg:px-24">
      <Pc className="px-24 pt-8 lg:px-0">
        <VideoListInfoMenu type="cover" />
      </Pc>
      <div className="flex flex-col gap-18 lg:grid lg:grid-cols-[160px_1fr] lg:items-start lg:gap-16">
        <MemberMenu selected={member} onSelect={handleMemberSelect} />
        {isLoading ? (
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
    </div>
  );
}
