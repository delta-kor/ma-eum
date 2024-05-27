import { PromotionVideoMeta, getMetaFromVideo } from '@/utils/video';
import { Video } from '@prisma/client';
import { format } from 'date-fns';

interface Props {
  video: Video;
}

export default function PromotionItem({ video }: Props) {
  const promotionMeta = getMetaFromVideo<PromotionVideoMeta>(video, 'promotion');

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <div className="text-16 font-500 text-gray-500">{format(video.date, 'yy. MM. dd.')}</div>
        <div className="text-18 font-600 text-black">{promotionMeta?.title || video.title}</div>
      </div>
    </div>
  );
}
