import PromotionItem from '@/components/video/PromotionItem';
import { ExtendedVideo } from '@/services/video.service';

interface Props {
  videos: ExtendedVideo[];
}

export default function PromotionList({ videos }: Props) {
  return (
    <div className="flex flex-col gap-12">
      <div className="text-20 font-700 text-black">Promotion</div>
      <div className="flex flex-col">
        {videos.map(video => (
          <PromotionItem key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}
