import MotionWrapper from '@/components/core/MotionWrapper';
import VideoHeader from '@/components/video/player/VideoHeader';
import VideoMembers from '@/components/video/player/VideoMembers';
import VideoPlayer, { VideoPlayerPlaceholder } from '@/components/video/player/VideoPlayer';
import VideoShare from '@/components/video/player/VideoShare';
import CategoryMetaCard from '@/components/video/player/meta/CategoryMetaCard';
import ChallengeMetaCard from '@/components/video/player/meta/ChallengeMetaCard';
import CoverMetaCard from '@/components/video/player/meta/CoverMetaCard';
import LinkMetaCard from '@/components/video/player/meta/LinkMetaCard';
import MusicMetaCard from '@/components/video/player/meta/MusicMetaCard';
import OfficialMetaCard from '@/components/video/player/meta/OfficialMetaCard';
import PromotionMetaCard from '@/components/video/player/meta/PromotionMetaCard';
import { ExtendedVideoWithCategory } from '@/services/video.service';
import {
  CoverVideoMeta,
  InboundChallengeVideoMeta,
  LinkVideoMeta,
  MembersVideoMeta,
  MusicVideoMeta,
  OfficialVideoMeta,
  OutboundChallengeVideoMeta,
  PromotionVideoMeta,
  ShortsVideoMeta,
  getMetaFromVideo,
} from '@/utils/video.util';

interface Props {
  video: ExtendedVideoWithCategory;
}

export default function VideoPlayerFrame({ video }: Props) {
  const categories = video.categories;

  const shortsMeta = getMetaFromVideo<ShortsVideoMeta>(video, 'shorts');
  const isShorts = !!shortsMeta;

  const membersMeta = getMetaFromVideo<MembersVideoMeta>(video, 'members');

  const musicMeta = getMetaFromVideo<MusicVideoMeta>(video, 'music');
  const coverMeta = getMetaFromVideo<CoverVideoMeta>(video, 'cover');
  const linkMeta = getMetaFromVideo<LinkVideoMeta>(video, 'link');
  const promotionMeta = getMetaFromVideo<PromotionVideoMeta>(video, 'promotion');
  const officialMeta = getMetaFromVideo<OfficialVideoMeta>(video, 'official');
  const inboundChallengeMeta = getMetaFromVideo<InboundChallengeVideoMeta>(
    video,
    'inboundChallenge'
  );
  const outboundChallengeMeta = getMetaFromVideo<OutboundChallengeVideoMeta>(
    video,
    'outboundChallenge'
  );

  const videoMeta = (
    <MotionWrapper layoutId="video-meta" className="flex flex-col gap-16">
      <VideoHeader video={video} />
      {membersMeta && <VideoMembers membersMeta={membersMeta} />}
      <VideoShare source={video.source} sourceId={video.sourceId} title={video.title} />
    </MotionWrapper>
  );

  return (
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
          {!isShorts && videoMeta}
        </div>
      </div>
      <div className="flex flex-col gap-16">
        {isShorts && videoMeta}
        {musicMeta && <MusicMetaCard musicMeta={musicMeta} />}
        {coverMeta && <CoverMetaCard coverMeta={coverMeta} />}
        {linkMeta && <LinkMetaCard linkMeta={linkMeta} />}
        {categories.map(category => (
          <CategoryMetaCard key={category.id} category={category} video={video} />
        ))}
        {promotionMeta && <PromotionMetaCard promotionMeta={promotionMeta} video={video} />}
        {musicMeta && officialMeta && <OfficialMetaCard musicMeta={musicMeta} video={video} />}
        {(inboundChallengeMeta || outboundChallengeMeta) && (
          <ChallengeMetaCard
            inboundChallengeMeta={inboundChallengeMeta}
            musicMeta={musicMeta}
            outboundChallengeMeta={outboundChallengeMeta}
          />
        )}
      </div>
    </div>
  );
}
