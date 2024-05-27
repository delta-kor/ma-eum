import PromotionItem from '@/components/video/PromotionItem';
import { Video } from '@prisma/client';

interface Props {
  videos: Video[];
}

export default function PromotionSection({ videos }: Props) {
  return (
    <div className="flex flex-col gap-12 px-24">
      <div className="text-20 font-700 text-black">Promotion</div>
      <div className="flex flex-col">
        {videos.map(video => (
          <PromotionItem key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}
