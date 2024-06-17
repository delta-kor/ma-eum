import VideoHeader from '@/components/video/player/VideoHeader';
import VideoPlayer, { VideoPlayerPlaceholder } from '@/components/video/player/VideoPlayer';
import VideoShare from '@/components/video/player/VideoShare';
import MusicMetaCard from '@/components/video/player/meta/MusicMetaCard';
import OfficialMetaCard from '@/components/video/player/meta/OfficialMetaCard';
import PromotionMetaCard from '@/components/video/player/meta/PromotionMetaCard';
import { VideoService } from '@/services/video.service';
import {
  MusicVideoMeta,
  OfficialVideoMeta,
  PromotionVideoMeta,
  getMetaFromVideo,
} from '@/utils/video.util';
import { notFound } from 'next/navigation';

export const revalidate = 0;

interface Props {
  params: {
    videoId: string;
  };
}

export default async function VideoPage({ params: { videoId } }: Props) {
  const video = await VideoService.getOne(videoId);
  if (!video) return notFound();

  const musicMeta = getMetaFromVideo<MusicVideoMeta>(video, 'music');
  const promotionMeta = getMetaFromVideo<PromotionVideoMeta>(video, 'promotion');
  const officialMeta = getMetaFromVideo<OfficialVideoMeta>(video, 'official');

  return (
    <div className="px-24 pb-24 lg:mt-artistic-header-height-lg lg:pt-16">
      <div className="flex flex-col gap-16 lg:mx-auto lg:grid lg:max-w-screen-xl lg:grid-cols-[1fr_360px]">
        <div className="self-stretch">
          <div className="flex flex-col gap-16 lg:sticky lg:left-0 lg:top-[84px]">
            <VideoPlayerPlaceholder />
            <VideoPlayer source={video.source} sourceId={video.sourceId} />
            <VideoHeader video={video} />
            <VideoShare source={video.source} sourceId={video.sourceId} title={video.title} />
          </div>
        </div>
        <div className="flex flex-col gap-16">
          {musicMeta && <MusicMetaCard musicMeta={musicMeta} />}
          {promotionMeta && <PromotionMetaCard promotionMeta={promotionMeta} video={video} />}
          {musicMeta && officialMeta && <OfficialMetaCard musicMeta={musicMeta} video={video} />}
        </div>
      </div>
    </div>
  );
}