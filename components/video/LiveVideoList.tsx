'use client';

import NoItems from '@/components/core/NoItems';
import Pc from '@/components/core/responsive/Pc';
import VideoListInfoMenu from '@/components/menu/VideoListInfoMenu';
import CategoryVideoItem from '@/components/video/CategoryVideoItem';
import { ExtendedVideo } from '@/services/video.service';

interface Props {
  videos: ExtendedVideo[];
}

export default function LiveVideoList({ videos }: Props) {
  return (
    <div className="flex flex-col gap-16 lg:mx-auto lg:max-w-screen-lgx lg:px-24">
      <Pc className="px-24 pt-8 lg:px-0">
        <VideoListInfoMenu type="live" />
      </Pc>
      <div className="flex flex-col gap-18">
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
    </div>
  );
}
