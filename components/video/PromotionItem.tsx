import GradientIcon from '@/components/core/GradientIcon';
import LazyImage from '@/components/core/LazyImage';
import { ExtendedVideo } from '@/services/video.service';
import { ImageUrl } from '@/utils/url.util';
import { PromotionVideoMeta, getMetaFromVideo } from '@/utils/video.util';
import { VideoSource } from '@prisma/client';
import { format } from 'date-fns';
import Link from 'next/link';

interface Props {
  video: ExtendedVideo;
}

export default function PromotionItem({ video }: Props) {
  const promotionMeta = getMetaFromVideo<PromotionVideoMeta>(video, 'promotion');

  return (
    <Link
      href={{ pathname: `/video/${video.id}`, query: { top: 'promotion' } }}
      className="flex gap-16"
    >
      <div className="flex flex-col items-center">
        <div className="rounded-8 bg-primary-200 p-8">
          <GradientIcon type="live" className="h-16" />
        </div>
        <div className="w-1 grow border-l-3 border-gray-100" />
      </div>
      <div className="flex grow flex-col gap-12 pb-32 lg:flex-row-reverse lg:justify-end">
        <div className="flex flex-col gap-4">
          <div className="text-16 font-500 text-gray-500">{format(video.date, 'yy. MM. dd.')}</div>
          <div className="text-18 font-600 text-black">{promotionMeta?.title || video.title}</div>
        </div>
        {video.source === VideoSource.YOUTUBE && (
          <LazyImage
            alt={video.title}
            src={ImageUrl.youtubeThumbnail(video.sourceId)}
            className="aspect-video rounded-16 bg-gray-100 object-cover lg:w-[240px]"
          />
        )}
      </div>
    </Link>
  );
}
