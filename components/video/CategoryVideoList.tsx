'use client';

import MemberMenu from '@/components/menu/MemberMenu';
import CategoryVideoItem from '@/components/video/CategoryVideoItem';
import { trpc } from '@/hooks/trpc';
import { Member } from '@/utils/video';
import { Category, Video } from '@prisma/client';
import { useState } from 'react';

interface Props {
  category: Category;
  preloadedVideos: Video[];
}

export default function CategoryVideoList({ category, preloadedVideos }: Props) {
  const [member, setMember] = useState<Member | null>(null);

  const videos = trpc.video.getCategoryVideos.useQuery(
    { categoryId: category.id, member },
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
      {!videos.isFetching && (
        <div className="flex flex-col gap-16 px-24 pb-24">
          {videos.data.map(video => (
            <CategoryVideoItem key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}
