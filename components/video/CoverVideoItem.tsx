import LazyImage from '@/components/core/LazyImage';
import { ExtendedVideo } from '@/services/video.service';
import { formatTimeAsDate } from '@/utils/time.util';
import { ImageUrl } from '@/utils/url.util';
import { CoverVideoMeta, getMetaFromVideo } from '@/utils/video.util';
import { VideoSource } from '@prisma/client';
import Link from 'next/link';

interface Props {
  video: ExtendedVideo;
}

export default function CoverVideoItem({ video }: Props) {
  if (video.source !== VideoSource.YOUTUBE) throw new Error('Invalid video source');

  const coverMeta = getMetaFromVideo<CoverVideoMeta>(video, 'cover');
  const title = coverMeta?.title || video.title;
  const kind = coverMeta?.kind;

  return (
    <Link
      href={{ pathname: `/video/${video.id}`, query: { top: 'cover' } }}
      className="jelly-video flex gap-16"
    >
      <LazyImage
        src={ImageUrl.youtubeThumbnail(video.sourceId)}
        className="aspect-video h-[88px] shrink-0 rounded-8 bg-gray-100"
      />
      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-4">
          {kind && (
            <div
              data-kind={kind}
              className="self-start rounded-8 bg-gradient-primary px-8 py-4 text-14 font-700 text-white data-[kind=dance]:bg-gradient-red"
            >
              {kind.toUpperCase()}
            </div>
          )}
          <div className="line-clamp-2 text-16 font-500 text-black">{title}</div>
        </div>
        <div className="text-14 font-500 text-gray-500">{formatTimeAsDate(video.date)}</div>
      </div>
    </Link>
  );
}

export function CoverVideoItemPlaceholder() {
  return (
    <div className="flex animate-pulse gap-16">
      <div className="aspect-video h-[88px] shrink-0 rounded-8 bg-gray-100" />
      <div className="flex grow flex-col justify-between">
        <div className="flex flex-col gap-4">
          <div className="h-[25px] w-[66px] rounded-8 bg-gray-100" />
          <div className="h-[19px] w-full rounded-4 bg-gray-100" />
        </div>
        <div className="h-[17px] w-[70px] rounded-4 bg-gray-100" />
      </div>
    </div>
  );
}
