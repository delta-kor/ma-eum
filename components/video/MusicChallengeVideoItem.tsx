import LazyImage from '@/components/core/LazyImage';
import { formatTimeAsDate } from '@/utils/time.util';
import { ImageUrl } from '@/utils/url.util';
import { Video, VideoSource } from '@prisma/client';
import Link from 'next/link';

interface Props {
  video: Video;
}

export default function MusicChallengeVideoItem({ video }: Props) {
  if (video.source !== VideoSource.YOUTUBE) throw new Error('Invalid video source');

  return (
    <Link href={`/video/${video.id}`} className="flex w-[158px] shrink-0 snap-start flex-col gap-8">
      <LazyImage
        src={ImageUrl.youtubeShortsThumbnail(video.sourceId)}
        className="aspect-shorts rounded-16 bg-gray-100"
      />
      <div className="flex flex-col gap-4">
        <div className="line-clamp-2 text-16 font-400 text-black">{video.title}</div>
        <div className="text-14 font-400 text-gray-500">{formatTimeAsDate(video.date)}</div>
      </div>
    </Link>
  );
}

export function MusicChallengeVideoItemPlaceholder() {
  return (
    <div className="flex w-[158px] shrink-0 snap-start flex-col gap-8">
      <div className="aspect-shorts rounded-16 bg-gray-100" />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <div className="h-16 w-full rounded-4 bg-gray-100" />
          <div className="h-16 w-full rounded-4 bg-gray-100" />
        </div>
        <div className="h-[17px] w-[96px] rounded-4 bg-gray-100" />
      </div>
    </div>
  );
}
