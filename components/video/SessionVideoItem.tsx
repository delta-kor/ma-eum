import LazyImage from '@/components/core/LazyImage';
import { getTagName } from '@/utils/session.util';
import { ImageUrl } from '@/utils/url.util';
import { StageVideoMeta, getMetaFromVideo } from '@/utils/video.util';
import { Video, VideoSource } from '@prisma/client';

interface Props {
  video: Video;
}

export default function SessionVideoItem({ video }: Props) {
  if (video.source !== VideoSource.YOUTUBE) throw new Error('Invalid video source');

  const stageMeta = getMetaFromVideo<StageVideoMeta>(video, 'stage');
  const description = stageMeta ? getTagName(stageMeta.tag) : 'Fancam';

  return (
    <div className="flex items-center gap-12">
      <LazyImage
        src={ImageUrl.youtubeThumbnail(video.sourceId)}
        className="aspect-video h-64 shrink-0 rounded-8 bg-primary-200"
      />
      <div className="flex min-w-0 flex-col gap-4">
        <div className="text-14 font-500 text-gray-500">{description}</div>
        <div className="line-clamp-2 text-16 font-600 text-black">{video.title}</div>
      </div>
    </div>
  );
}

export function SessionVideoItemPlaceholder() {
  return (
    <div className="flex animate-pulse items-center gap-12">
      <div className="aspect-video h-64 shrink-0 rounded-8 bg-primary-200" />
      <div className="flex grow flex-col gap-4">
        <div className="h-[17px] w-[80px] rounded-4 bg-gray-100" />
        <div className="h-[19px] w-full rounded-4 bg-gray-100" />
      </div>
    </div>
  );
}
