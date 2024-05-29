'use client';

import MemberMenu from '@/components/menu/MemberMenu';
import CategoryVideoItem from '@/components/video/CategoryVideoItem';
import { Category, Video } from '@prisma/client';

interface Props {
  category: Category;
  preloadedVideos: Video[];
}

export default function CategoryVideoList({ category, preloadedVideos }: Props) {
  const videos = preloadedVideos;

  return (
    <div className="flex flex-col gap-18">
      <MemberMenu selected={null} onSelect={() => {}} />
      <div className="flex flex-col gap-16 px-24 pb-24">
        {videos.map(video => (
          <CategoryVideoItem key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}
