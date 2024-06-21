import { ExtendedVideo } from '@/services/video.service';
import { Member } from '@/utils/member.util';

export type StageVideoTag =
  | '1take'
  | 'full'
  | 'full_360'
  | 'full_hd'
  | 'live'
  | 'main'
  | 'rehearsal'
  | 'side'
  | 'single_face'
  | 'single_full'
  | 'tower';

export interface VideoMetaBase {}

export interface PromotionVideoMeta extends VideoMetaBase {
  albumId: string;
  order: number;
  title: string;
}

export interface MusicVideoMeta extends VideoMetaBase {
  musicId: string;
}

export interface OfficialVideoMeta extends VideoMetaBase {
  order: number;
  title: string;
}

export interface StageVideoMeta extends VideoMetaBase {
  sessionId: string;
  tag: StageVideoTag;
  time: number;
}

export interface FancamVideoMeta extends VideoMetaBase {
  embed: boolean;
  ownerId: string;
  sessionId: string;
}

export interface MembersVideoMeta extends VideoMetaBase {
  members: Member[];
}

export interface CoverVideoMeta extends VideoMetaBase {
  kind: 'dance' | 'vocal';
  title: string;
}

export interface ShortsVideoMeta extends VideoMetaBase {}

export interface EpisodeVideoMeta extends VideoMetaBase {
  episode: null | string;
  title: string;
}

export interface LinkVideoMeta extends VideoMetaBase {
  videoId: string;
}

export interface InboundChallengeVideoMeta extends VideoMetaBase {
  from: null | string;
}

export interface OutboundChallengeVideoMeta extends VideoMetaBase {
  music: string;
  to: null | string;
}

export interface LiveVideoMeta extends VideoMetaBase {
  disable: boolean;
}

type MergedVideoData =
  | CoverVideoMeta
  | EpisodeVideoMeta
  | FancamVideoMeta
  | InboundChallengeVideoMeta
  | LinkVideoMeta
  | LiveVideoMeta
  | MembersVideoMeta
  | MusicVideoMeta
  | OfficialVideoMeta
  | OutboundChallengeVideoMeta
  | PromotionVideoMeta
  | ShortsVideoMeta
  | StageVideoMeta;

declare global {
  namespace PrismaJson {
    type VideoMeta = MergedVideoData;
  }
}

export type VideoMeta = PrismaJson.VideoMeta;
export type VideoMetaType =
  | 'cover'
  | 'episode'
  | 'fancam'
  | 'inboundChallenge'
  | 'link'
  | 'live'
  | 'members'
  | 'music'
  | 'official'
  | 'outboundChallenge'
  | 'promotion'
  | 'shorts'
  | 'stage';

export const AvailableMetaTypes: VideoMetaType[] = [
  'shorts',
  'link',
  'members',
  'episode',
  'cover',
  'stage',
  'fancam',
  'music',
  'official',
  'promotion',
  'inboundChallenge',
  'outboundChallenge',
  'live',
];

export function getMetaFromVideo<T>(video: ExtendedVideo, metaType: VideoMetaType): T | null {
  const metaInfo = video.metaInfo;
  if (!metaInfo) return null;

  const meta = metaInfo[metaType];
  if (!meta) return null;

  return meta as T;
}

export function sliceVideosAround(
  videos: ExtendedVideo[],
  video: ExtendedVideo,
  count: number
): ExtendedVideo[] {
  const currentIndex = videos.findIndex(item => item.id === video.id);
  if (currentIndex === -1) return [];

  let start = Math.max(0, currentIndex - count);
  let end = Math.min(videos.length, currentIndex + count + 1);

  if (end - start < count * 2 + 1) {
    if (start === 0) {
      end = Math.min(videos.length, start + count * 2 + 1);
    } else {
      start = Math.max(0, end - count * 2 - 1);
    }
  }

  return videos.slice(start, end);
}
