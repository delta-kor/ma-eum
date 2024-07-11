import GradientIcon from '@/components/core/GradientIcon';
import SnsCarousel from '@/components/sns/SnsCarousel';
import YoutubeSnsFeedItem from '@/components/sns/YoutubeSnsFeedItem';
import { Video } from '@prisma/client';

interface Props {
  videos: Video[];
}

export default function YoutubeSnsFeed({ videos }: Props) {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex items-center gap-10 self-start">
        <GradientIcon type="shorts" className="w-24 text-primary-500" />
        <div className="shrink-0 text-22 font-700 text-black lg:text-24">Youtube</div>
      </div>
      <SnsCarousel>
        {videos.map(video => (
          <YoutubeSnsFeedItem key={video.id} video={video} />
        ))}
      </SnsCarousel>
    </div>
  );
}
