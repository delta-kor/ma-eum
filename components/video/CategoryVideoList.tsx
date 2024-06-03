'use client';

import NoItems from '@/components/core/NoItems';
import MemberMenu from '@/components/menu/MemberMenu';
import CategoryVideoItem, {
  CategoryVideoItemPlaceholder,
} from '@/components/video/CategoryVideoItem';
import { trpc } from '@/hooks/trpc';
import { Member } from '@/utils/video.util';
import { Category, CategoryOptions, Video } from '@prisma/client';
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

  const displayMembers = category.options.includes(CategoryOptions.MEMBERS);

  return (
    <div
      data-members={displayMembers}
      className="flex flex-col gap-18 lg:mx-auto lg:grid lg:max-w-screen-lgx lg:grid-cols-1 lg:items-start lg:gap-16 lg:px-24 data-[members=true]:lg:grid-cols-[160px,1fr]"
    >
      {displayMembers && <MemberMenu selected={member} onSelect={handleMemberSelect} />}
      {videos.isFetching ? (
        <div className="flex flex-col gap-16 px-24 pb-24 lg:grid lg:grid-cols-2 lg:px-0">
          <CategoryVideoItemPlaceholder />
          <CategoryVideoItemPlaceholder />
          <CategoryVideoItemPlaceholder />
          <CategoryVideoItemPlaceholder />
        </div>
      ) : videos.data.length > 0 ? (
        <div className="flex flex-col gap-16 px-24 pb-24 lg:grid lg:grid-cols-2 lg:px-0">
          {videos.data.map(video => (
            <CategoryVideoItem key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <NoItems />
      )}
    </div>
  );
}
