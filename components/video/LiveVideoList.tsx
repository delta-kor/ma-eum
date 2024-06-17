'use client';

import NoItems from '@/components/core/NoItems';
import CategoryVideoItem from '@/components/video/CategoryVideoItem';
import { ExtendedVideo } from '@/services/video.service';

interface Props {
  videos: ExtendedVideo[];
}

export default function LiveVideoList({ videos }: Props) {
  return (
    <div className="flex flex-col gap-18 lg:mx-auto lg:max-w-screen-lgx lg:px-24">
      {videos.length > 0 ? (
        <div className="flex flex-col gap-16 px-24 pb-24 lg:grid lg:grid-cols-2 lg:px-0">
          {videos.map(video => (
            <CategoryVideoItem key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <NoItems />
      )}
    </div>
  );
}
