import MetaVideoItem from '@/components/video/player/meta/MetaVideoItem';
import { ExtendedVideo, VideoService } from '@/services/video.service';
import { sliceVideosAround } from '@/utils/video.util';
import { Category } from '@prisma/client';
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

  return (
    <div className="flex flex-col gap-16 rounded-16 bg-gray-50 px-24 py-16">
      <div className="flex items-center justify-between">
        <div className="shrink-0 text-20 font-700 text-black">{category.title}</div>
      </div>
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
        View All
      </Link>
    </div>
  );
}
