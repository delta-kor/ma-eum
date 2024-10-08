'use client';

import NoItems from '@/components/core/NoItems';
import Pc from '@/components/core/responsive/Pc';
import CategoryInfoMenu from '@/components/menu/CategoryInfoMenu';
import MemberMenu from '@/components/menu/MemberMenu';
import CategoryVideoItem, {
  CategoryVideoItemPlaceholder,
} from '@/components/video/CategoryVideoItem';
import useQuery from '@/hooks/query';
import { trpc } from '@/hooks/trpc';
import { ExtendedVideo } from '@/services/video.service';
import { Member, getSanitizedMember } from '@/utils/member.util';
import { Category, CategoryOptions } from '@prisma/client';
import { useState } from 'react';

interface Props {
  category: Category;
  preloadedVideos: ExtendedVideo[];
}

export default function CategoryVideoList({ category, preloadedVideos }: Props) {
  const query = useQuery();

  const initialMember = getSanitizedMember(query.get('member'));
  const [member, setMember] = useState<Member | null>(initialMember);
  const [isFetchingMember, setIsFetchingMember] = useState(false);

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
    setIsFetchingMember(true);
  }

  const isLoading = videos.isLoading || (videos.isFetching && isFetchingMember);
  const displayMembers = category.options.includes(CategoryOptions.MEMBERS);

  return (
    <div className="flex flex-col gap-16 lg:mx-auto lg:max-w-screen-lgx lg:px-24">
      <Pc className="px-24 pt-8 lg:px-0">
        <CategoryInfoMenu
          categoryTitle={category.title}
          displayMembers={displayMembers}
          videosCount={videos.data.length}
        />
      </Pc>
      <div
        data-members={displayMembers}
        className="flex flex-col gap-18 lg:grid lg:grid-cols-1 lg:items-start lg:gap-16 data-[members=true]:lg:grid-cols-[160px_1fr]"
      >
        {displayMembers && <MemberMenu selected={member} onSelect={handleMemberSelect} />}
        {isLoading ? (
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
    </div>
  );
}
