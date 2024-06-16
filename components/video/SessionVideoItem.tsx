import LazyImage from '@/components/core/LazyImage';
import { getTagName } from '@/utils/session.util';
import { ImageUrl } from '@/utils/url.util';
import { MusicVideoMeta, StageVideoMeta, getMetaFromVideo } from '@/utils/video.util';
import { Video, VideoSource } from '@prisma/client';
import Link from 'next/link';

interface Props {
  video: Video;
}

export default function SessionVideoItem({ video }: Props) {
  if (video.source !== VideoSource.YOUTUBE) throw new Error('Invalid video source');

  const stageMeta = getMetaFromVideo<StageVideoMeta>(video, 'stage');
  const musicMeta = getMetaFromVideo<MusicVideoMeta>(video, 'music');
  const musicId = musicMeta?.musicId || '';

  if (stageMeta)
    return (
      <Link
        href={`/mixer/${musicId}?video=${video.id}`}
        className="relative overflow-hidden rounded-8"
      >
        <LazyImage
          src={ImageUrl.youtubeThumbnail(video.sourceId)}
          className="aspect-video shrink-0 bg-primary-200"
        />
        <div className="absolute -bottom-2 -left-2 rounded-tr-8 border-2 border-white bg-gradient-primary px-8 py-4 text-14 font-600 text-white">
          {getTagName(stageMeta.tag)}
        </div>
      </Link>
    );
  else
    return (
      <div className="col-span-2 flex items-center gap-12 md:col-span-3 lg:col-span-2">
        <LazyImage
          src={ImageUrl.youtubeThumbnail(video.sourceId)}
          className="aspect-video h-64 shrink-0 rounded-8 bg-primary-200"
        />
        <div className="flex min-w-0 flex-col gap-4">
          <div className="text-14 font-500 text-gray-500">Fancam</div>
          <div className="line-clamp-2 text-14 font-500 text-black">{video.title}</div>
        </div>
      </div>
    );
}
