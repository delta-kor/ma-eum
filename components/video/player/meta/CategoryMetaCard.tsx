import Icon from '@/components/core/Icon';
import Translate from '@/components/core/Translate';
import MetaVideoItem from '@/components/video/player/meta/MetaVideoItem';
import { ExtendedVideo, VideoService } from '@/services/video.service';
import { sliceVideosAround } from '@/utils/video.util';
import { Category, CategoryOptions } from '@prisma/client';
import Link from 'next/link';

interface Props {
  category: Category;
  video: ExtendedVideo;
}

export default async function CategoryMetaCard({ category, video }: Props) {
  const categoryVideosData = VideoService.getCategoryVideos(category.id, null);

  const [categoryVideos] = await Promise.all([categoryVideosData]);
  if (categoryVideos.length === 0) return null;

  const selectedVideos = sliceVideosAround(categoryVideos, video, 2);

  const displayEpisode = category.options.includes(CategoryOptions.EPISODE);
  const previousVideo = selectedVideos[selectedVideos.findIndex(item => item.id === video.id) - 1];
  const nextVideo = selectedVideos[selectedVideos.findIndex(item => item.id === video.id) + 1];

  return (
    <div className="flex flex-col gap-16 rounded-16 bg-gray-50 px-24 py-16">
      <div className="flex items-center justify-between">
        <div className="truncate text-20 font-700 text-black">{category.title}</div>
      </div>
      {displayEpisode && (
        <div className="flex items-center justify-between">
          {previousVideo ? (
            <Link href={`/video/${previousVideo.id}`} className="flex items-center gap-12">
              <Icon type="left" className="w-14 text-primary-500" />
              <div className="text-16 font-700 text-primary-500">
                {previousVideo.metaInfo?.episode?.episode || 'Previous'}
              </div>
            </Link>
          ) : (
            <div />
          )}
          {nextVideo && (
            <Link href={`/video/${nextVideo.id}`} className="flex items-center gap-12">
              <div className="text-16 font-700 text-primary-500">
                {nextVideo.metaInfo?.episode?.episode || 'Next'}
              </div>
              <Icon type="right" className="w-14 text-primary-500" />
            </Link>
          )}
        </div>
      )}
      <div className="flex flex-col gap-12">
        {selectedVideos.map(item => (
          <MetaVideoItem
            key={item.id}
            active={item.id === video.id}
            metaType="episode"
            video={item}
          />
        ))}
      </div>
      <Link
        href={`/videos/categories/${category.id}`}
        className="-my-16 py-16 text-center text-16 font-600 text-gray-500"
      >
        <Translate>$view_all</Translate>
      </Link>
    </div>
  );
}
