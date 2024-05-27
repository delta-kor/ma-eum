import { Video } from '@prisma/client';

export type Member = 'duna' | 'geumhee' | 'seoyeon' | 'sihyeon' | 'sua' | 'yeham' | 'yuna';
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

export interface VideoMetaBase {
  type: string;
}

export interface PromotionVideoMeta extends VideoMetaBase {
  albumId: string;
  order: number;
  title: string;
  type: 'promotion';
}

export interface MusicVideoMeta extends VideoMetaBase {
  musicId: string;
  type: 'music';
}

export interface OfficialVideoMeta extends VideoMetaBase {
  order: number;
  title: string;
  type: 'official';
}

export interface StageVideoMeta extends VideoMetaBase {
  order: number;
  sessionId: string;
  tag: StageVideoTag;
  type: 'stage';
}

export interface FancamVideoMeta extends VideoMetaBase {
  embed: boolean;
  ownerId: string;
  type: 'fancam';
}

export interface MembersVideoMeta extends VideoMetaBase {
  members: Member[];
  type: 'members';
}

export interface CoverVideoMeta extends VideoMetaBase {
  kind: 'dance' | 'vocal';
  title: string;
  type: 'cover';
}

export interface ShortsVideoMeta extends VideoMetaBase {
  type: 'shorts';
}

export interface EpisodeVideoMeta extends VideoMetaBase {
  episode: null | string;
  title: string;
  type: 'episode';
}

export interface LinkVideoMeta extends VideoMetaBase {
  type: 'link';
  videoId: string;
}

export interface InboundChallengeVideoMeta extends VideoMetaBase {
  from: null | string;
  type: 'inbound_challenge';
}

export interface OutboundChallengeVideoMeta extends VideoMetaBase {
  music: string;
  to: null | string;
  type: 'outbound_challenge';
}

export interface LiveVideoMeta extends VideoMetaBase {
  disable: boolean;
  type: 'live';
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
export type VideoMetaType = VideoMeta['type'];

export const Members: Member[] = ['geumhee', 'sihyeon', 'seoyeon', 'yuna', 'duna', 'sua', 'yeham'];
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
  'inbound_challenge',
  'outbound_challenge',
  'live',
];

export function getMetaFromVideo<T extends VideoMeta>(video: Video, metaType: T['type']): T | null {
  return (video.meta.find(meta => meta.type === metaType) as T) || null;
}
