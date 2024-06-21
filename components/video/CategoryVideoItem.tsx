import LazyImage from '@/components/core/LazyImage';
import { ExtendedVideo } from '@/services/video.service';
import { ImageUrl } from '@/utils/url.util';
import { EpisodeVideoMeta, getMetaFromVideo } from '@/utils/video.util';
import { VideoSource } from '@prisma/client';
import { format } from 'date-fns';
import Link from 'next/link';

interface Props {
  video: ExtendedVideo;
}

export default function CategoryVideoItem({ video }: Props) {
  if (video.source !== VideoSource.YOUTUBE) throw new Error('Invalid video source');

  const episodeMeta = getMetaFromVideo<EpisodeVideoMeta>(video, 'episode');
  const title = episodeMeta?.title || video.title;
  const episode = episodeMeta?.episode || null;

  return (
    <Link
      href={{ pathname: `/video/${video.id}`, query: { top: 'episode' } }}
      className="flex gap-16"
    >
      <LazyImage
        src={ImageUrl.youtubeThumbnail(video.sourceId)}
        className="aspect-video h-[88px] shrink-0 rounded-8 bg-gray-100"
      />
      <div className="flex flex-col justify-between">
        {episode ? (
          <div className="flex flex-col gap-2">
            <div className="font-700 text-primary-500">{episode}</div>
            <div className="line-clamp-2 text-16 font-500 text-black"> {title}</div>
          </div>
        ) : (
          <div className="line-clamp-3 text-16 font-500 text-black">{title}</div>
        )}
        <div className="text-14 font-500 text-gray-500">{format(video.date, 'yy. MM. dd.')}</div>
      </div>
    </Link>
  );
}

export function CategoryVideoItemPlaceholder() {
  return (
    <div className="flex animate-pulse gap-16">
      <div className="aspect-video h-[88px] shrink-0 rounded-8 bg-gray-100" />
      <div className="flex grow flex-col justify-between">
        <div className="flex flex-col gap-4">
          <div className="h-[19px] w-full rounded-4 bg-gray-100" />
          <div className="h-[19px] w-full rounded-4 bg-gray-100" />
        </div>
        <div className="h-[17px] w-[70px] rounded-4 bg-gray-100" />
      </div>
    </div>
  );
}
