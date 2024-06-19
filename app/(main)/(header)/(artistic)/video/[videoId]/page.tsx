import VideoHeader from '@/components/video/player/VideoHeader';
import VideoPlayer, { VideoPlayerPlaceholder } from '@/components/video/player/VideoPlayer';
import VideoShare from '@/components/video/player/VideoShare';
import CategoryMetaCard from '@/components/video/player/meta/CategoryMetaCard';
import CoverMetaCard from '@/components/video/player/meta/CoverMetaCard';
import MusicMetaCard from '@/components/video/player/meta/MusicMetaCard';
import OfficialMetaCard from '@/components/video/player/meta/OfficialMetaCard';
import PromotionMetaCard from '@/components/video/player/meta/PromotionMetaCard';
import { VideoService } from '@/services/video.service';
import {
  CoverVideoMeta,
  MusicVideoMeta,
  OfficialVideoMeta,
  PromotionVideoMeta,
  ShortsVideoMeta,
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
  const video = await VideoService.getOneWithCategory(videoId);
  if (!video) return notFound();

  const categories = video.categories;

  const shortsMeta = getMetaFromVideo<ShortsVideoMeta>(video, 'shorts');
  const isShorts = !!shortsMeta;

  const musicMeta = getMetaFromVideo<MusicVideoMeta>(video, 'music');
  const coverMeta = getMetaFromVideo<CoverVideoMeta>(video, 'cover');
  const promotionMeta = getMetaFromVideo<PromotionVideoMeta>(video, 'promotion');
  const officialMeta = getMetaFromVideo<OfficialVideoMeta>(video, 'official');

  return (
    <div className="px-24 pb-24 lg:mt-artistic-header-height-lg lg:pt-16">
      <div
        data-shorts={isShorts}
        className="flex flex-col gap-16 lg:mx-auto lg:grid lg:max-w-screen-xl lg:grid-cols-[1fr_360px] lg:justify-center data-[shorts=true]:lg:max-w-screen-lg data-[shorts=true]:lg:grid-cols-[430px_1fr]"
      >
        <div className="self-stretch">
          <div className="flex flex-col gap-16 lg:sticky lg:left-0 lg:top-[84px]">
            <div className="-mx-24 lg:mx-0 lg:hidden">
              <VideoPlayerPlaceholder shorts={isShorts} />
            </div>
            <VideoPlayer shorts={isShorts} source={video.source} sourceId={video.sourceId} />
            <VideoHeader video={video} />
            <VideoShare source={video.source} sourceId={video.sourceId} title={video.title} />
          </div>
        </div>
        <div className="flex flex-col gap-16">
          {musicMeta && <MusicMetaCard musicMeta={musicMeta} />}
          {coverMeta && <CoverMetaCard coverMeta={coverMeta} />}
          {categories.map(category => (
            <CategoryMetaCard key={category.id} category={category} video={video} />
          ))}
          {promotionMeta && <PromotionMetaCard promotionMeta={promotionMeta} video={video} />}
          {musicMeta && officialMeta && <OfficialMetaCard musicMeta={musicMeta} video={video} />}
        </div>
      </div>
    </div>
  );
}
