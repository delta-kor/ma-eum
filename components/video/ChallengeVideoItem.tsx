import GradientIcon from '@/components/core/GradientIcon';
import Icon from '@/components/core/Icon';
import LazyImage from '@/components/core/LazyImage';
import Translate from '@/components/core/Translate';
import { trpc } from '@/hooks/trpc';
import { ExtendedVideo } from '@/services/video.service';
import { getMemberName } from '@/utils/member.util';
import { formatTimeAsDate } from '@/utils/time.util';
import { ImageUrl } from '@/utils/url.util';
import {
  InboundChallengeVideoMeta,
  MembersVideoMeta,
  MusicVideoMeta,
  OutboundChallengeVideoMeta,
  getMetaFromVideo,
} from '@/utils/video.util';
import { VideoSource } from '@prisma/client';
import Link from 'next/link';

interface Props {
  video: ExtendedVideo;
}

export default function ChallengeVideoItem({ video }: Props) {
  if (video.source !== VideoSource.YOUTUBE) throw new Error('Invalid video source');

  const inboundChallengeMeta = getMetaFromVideo<InboundChallengeVideoMeta>(
    video,
    'inboundChallenge'
  );
  const outboundChallengeMeta = getMetaFromVideo<OutboundChallengeVideoMeta>(
    video,
    'outboundChallenge'
  );
  const membersMeta = getMetaFromVideo<MembersVideoMeta>(video, 'members');
  const musicMeta = getMetaFromVideo<MusicVideoMeta>(video, 'music');

  const music = trpc.music.getOne.useQuery(
    { id: musicMeta?.musicId || null },
    {
      enabled: musicMeta !== null,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  );
  const data = music.data;
  if (musicMeta !== null && !data) return <ChallengeVideoItemPlaceholder />;

  const isInboundChallenge = !!inboundChallengeMeta;
  const title = isInboundChallenge ? data?.shortTitle : outboundChallengeMeta?.music;

  const participant = isInboundChallenge ? inboundChallengeMeta?.from : outboundChallengeMeta?.to;
  const members = !membersMeta || membersMeta.members.length >= 4 ? [] : membersMeta.members;

  return (
    <Link
      href={{ pathname: `/video/${video.id}`, query: { top: 'challenge' } }}
      className="flex flex-col gap-10"
    >
      <div className="flex items-center gap-4">
        <div className="text-16 font-600 text-gray-500">{participant || 'CSR'}</div>
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
      <div className="jelly-video flex gap-16">
        <LazyImage
          src={ImageUrl.youtubeThumbnail(video.sourceId)}
          className="aspect-video h-[88px] shrink-0 rounded-8 bg-gray-100"
        />
        <div className="flex min-w-0 flex-col justify-between">
          <div className="flex min-w-0 flex-col gap-4">
            <div className="flex items-center gap-6">
              {musicMeta ? (
                <GradientIcon type="cover" className="w-16 shrink-0" />
              ) : (
                <GradientIcon type="challenge" className="w-16 shrink-0" />
              )}
              <div className="line-clamp-2 text-16 font-500 text-black">{title}</div>
            </div>
            <div className="truncate text-14 font-500 text-gray-500">
              {formatTimeAsDate(video.date)}
            </div>
          </div>
          <div className="flex min-w-0 gap-4 overflow-hidden">
            {members.map(member => (
              <div
                key={member}
                className="shrink-0 rounded-4 bg-primary-200 px-8 py-4 text-12 font-500 text-black"
              >
                <Translate>{getMemberName(member)}</Translate>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

export function ChallengeVideoItemPlaceholder() {
  return (
    <div className="flex flex-col gap-10">
      <div className="h-[19px] w-64 rounded-4 bg-gray-100" />
      <div className="flex gap-16">
        <div className="aspect-video h-[88px] shrink-0 rounded-8 bg-gray-100" />
        <div className="flex grow flex-col justify-between">
          <div className="flex flex-col gap-4">
            <div className="h-[19px] w-full rounded-4 bg-gray-100" />
            <div className="h-[19px] w-[70px] rounded-4 bg-gray-100" />
          </div>
          <div className="h-[17px] w-1/2 rounded-4 bg-gray-100" />
        </div>
      </div>
    </div>
  );
}
