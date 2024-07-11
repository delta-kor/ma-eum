import GradientIcon from '@/components/core/GradientIcon';
import Icon from '@/components/core/Icon';
import Translate from '@/components/core/Translate';
import MetaVideoItem from '@/components/video/player/meta/MetaVideoItem';
import MetaWrapper from '@/components/video/player/meta/MetaWrapper';
import { MusicService } from '@/services/music.service';
import { ExtendedVideo, VideoService } from '@/services/video.service';
import {
  InboundChallengeVideoMeta,
  MusicVideoMeta,
  OutboundChallengeVideoMeta,
  sliceVideosAround,
} from '@/utils/video.util';
import Link from 'next/link';

interface Props {
  inboundChallengeMeta: InboundChallengeVideoMeta | null;
  musicMeta: MusicVideoMeta | null;
  outboundChallengeMeta: OutboundChallengeVideoMeta | null;
  video: ExtendedVideo;
}

export default async function ChallengeMetaCard({
  inboundChallengeMeta,
  musicMeta,
  outboundChallengeMeta,
  video,
}: Props) {
  const isInboundChallenge = !!inboundChallengeMeta;
  const participant = isInboundChallenge ? inboundChallengeMeta?.from : outboundChallengeMeta?.to;

  const music = musicMeta && (await MusicService.getOne(musicMeta.musicId));
  const musicContent = music ? music.shortTitle : outboundChallengeMeta?.music || '$challenge';

  const challengeVideos = (music && (await VideoService.getMusicChallengeVideos(music.id))) || [];
  const slicedChallengeVideos = sliceVideosAround(challengeVideos, video, 1);

  const link = !challengeVideos
    ? `/videos/challenge`
    : `/videos/albums/${music!.albumId}/performance?music=${music!.id}#challenge`;

  return (
    <MetaWrapper topFor={isInboundChallenge ? 'inboundChallenge' : 'outboundChallenge'}>
      <div className="flex flex-col gap-16 rounded-16 bg-gray-50 px-24 py-16">
        <Link href={link} className="flex flex-wrap items-center justify-between gap-8">
          <div className="flex items-center gap-8">
            <GradientIcon type="challenge" className="w-20 shrink-0" />
            <div className="line-clamp-2 text-18 font-700 text-black">
              <Translate>{musicContent}</Translate>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="line-clamp-2 text-16 font-600 text-gray-500">
              {participant || 'CSR'}
            </div>
            {isInboundChallenge && (
              <Icon
                type={participant ? 'rightArrow' : 'returnArrow'}
                className="w-12 shrink-0 text-c-blue"
              />
            )}
            {!isInboundChallenge && <Icon type="rightArrow" className="w-12 shrink-0 text-c-red" />}
            {isInboundChallenge && participant && (
              <div className="text-16 font-600 text-gray-500">CSR</div>
            )}
          </div>
        </Link>
        {slicedChallengeVideos.length > 0 && (
          <div className="flex flex-col gap-16">
            {slicedChallengeVideos.map(item => (
              <MetaVideoItem
                key={item.id}
                active={item.id === video.id}
                metaType="inboundChallenge"
                video={item}
              />
            ))}
          </div>
        )}
      </div>
    </MetaWrapper>
  );
}
