import LazyImage from '@/components/core/LazyImage';
import { ImageUrl } from '@/utils/url.util';
import { OfficialVideoMeta, getMetaFromVideo } from '@/utils/video.util';
import { Video, VideoSource } from '@prisma/client';
import { format } from 'date-fns';

interface Props {
  video: Video;
}

export default function OfficialVideoItem({ video }: Props) {
  if (video.source !== VideoSource.YOUTUBE) throw new Error('Invalid video source');

  const officialMeta = getMetaFromVideo<OfficialVideoMeta>(video, 'official');
  const title = officialMeta?.title || video.title;

  return (
    <div className="flex items-center gap-16">
      <LazyImage
        src={ImageUrl.youtubeThumbnail(video.sourceId)}
        className="aspect-video h-64 shrink-0 rounded-8"
      />
      <div className="flex flex-col gap-4">
        <div className="text-18 font-600 text-black">{title}</div>
        <div className="text-14 font-500 text-gray-500">{format(video.date, 'yy. MM. dd')}</div>
      </div>
    </div>
  );
}

export function OfficialVideoItemPlaceholder() {
  return (
    <div className="flex animate-pulse items-center gap-16">
      <div className="aspect-video h-64 shrink-0 rounded-8 bg-gray-100" />
      <div className="flex grow flex-col gap-4">
        <div className="h-[21px] w-full rounded-4 bg-gray-100" />
        <div className="h-[17px] w-[70px] rounded-4 bg-gray-100" />
      </div>
    </div>
  );
}
