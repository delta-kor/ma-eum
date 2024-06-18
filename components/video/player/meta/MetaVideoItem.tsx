import Icon from '@/components/core/Icon';
import LazyImage from '@/components/core/LazyImage';
import { ExtendedVideo } from '@/services/video.service';
import { ImageUrl } from '@/utils/url.util';
import {
  EpisodeVideoMeta,
  OfficialVideoMeta,
  VideoMetaType,
  getMetaFromVideo,
} from '@/utils/video.util';
import { VideoSource } from '@prisma/client';
import { format } from 'date-fns';
import Link from 'next/link';

interface Props {
  active?: boolean;
  metaType?: VideoMetaType;
  video: ExtendedVideo;
}

export default function MetaVideoItem({ active, metaType, video }: Props) {
  if (video.source !== VideoSource.YOUTUBE) throw new Error('Invalid video source');

  let displayDate: boolean = true;

  let title: string = video.title;
  let episode: null | string = null;

  if (metaType === 'official') {
    const officialMeta = getMetaFromVideo<OfficialVideoMeta>(video, 'official');
    if (officialMeta?.title) title = officialMeta.title;
  }
  if (metaType === 'episode') {
    const episodeMeta = getMetaFromVideo<EpisodeVideoMeta>(video, 'episode');
    if (episodeMeta) {
      title = episodeMeta.title;
      episode = episodeMeta.episode;
      displayDate = episode === null;
    }
  }

  return (
    <Link href={`/video/${video.id}`} className="flex items-center gap-16">
      <div className="relative">
        <LazyImage
          src={ImageUrl.youtubeThumbnail(video.sourceId)}
          className="aspect-video h-64 shrink-0 rounded-8 bg-gray-100"
        />
        {active && (
          <div className="absolute inset-0 flex items-center justify-center rounded-8 bg-primary-500/70">
            <Icon type="play" className="w-16 text-white" />
          </div>
        )}
      </div>
      <div className="flex min-w-0 flex-col gap-4">
        {episode !== null && <div className="text-14 font-700 text-primary-500">{episode}</div>}
        <div className="flex items-center gap-8">
          <div className="line-clamp-2 text-16 font-600 text-black">{title}</div>
        </div>
        {displayDate && (
          <div className="text-14 font-500 text-gray-500">{format(video.date, 'yy. MM. dd')}</div>
        )}
      </div>
    </Link>
  );
}
