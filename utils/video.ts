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
  type: 'promotion';
}

export interface MusicVideoMeta extends VideoMetaBase {
  musicId: string;
  type: 'music';
}

export interface OfficialVideoMeta extends VideoMetaBase {
  order: number;
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

export interface EpisodeVideoMeta extends VideoMetaBase {
  episode: string;
  title: string;
  type: 'episode';
}

export interface ShortsVideoMeta extends VideoMetaBase {
  type: 'shorts';
}

type MergedVideoData =
  | CoverVideoMeta
  | EpisodeVideoMeta
  | FancamVideoMeta
  | MembersVideoMeta
  | MusicVideoMeta
  | OfficialVideoMeta
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
