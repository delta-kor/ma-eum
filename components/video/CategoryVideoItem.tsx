import LazyImage from '@/components/core/LazyImage';
import { ImageUrl } from '@/utils/url';
import { EpisodeVideoMeta, getMetaFromVideo } from '@/utils/video';
import { Video } from '@prisma/client';
import { format } from 'date-fns';

interface Props {
  video: Video;
}

export default function CategoryVideoItem({ video }: Props) {
  const episodeMeta = getMetaFromVideo<EpisodeVideoMeta>(video, 'episode');
  const title = episodeMeta?.title || video.title;
  const episode = episodeMeta?.episode || null;

  return (
    <div className="flex gap-16">
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
    </div>
  );
}
