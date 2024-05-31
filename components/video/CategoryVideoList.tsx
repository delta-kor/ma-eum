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

  return (
    <div className="flex flex-col gap-18">
      {category.options.includes(CategoryOptions.MEMBERS) && (
        <MemberMenu selected={member} onSelect={handleMemberSelect} />
      )}
      {videos.isFetching ? (
        <div className="flex flex-col gap-16 px-24 pb-24">
          <CategoryVideoItemPlaceholder />
          <CategoryVideoItemPlaceholder />
          <CategoryVideoItemPlaceholder />
        </div>
      ) : videos.data.length > 0 ? (
        <div className="flex flex-col gap-16 px-24 pb-24">
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
