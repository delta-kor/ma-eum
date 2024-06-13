export type VividFeedType = 'bstage' | 'daum' | 'tiktok' | 'twitter';

export interface VividFeed {
  date: Date;
  id: string;
  media: VividMedia[];
  members: string[];
  title: string;
  type: VividFeedType;
}

export type VividMedia = VividImageMedia | VividVideoMedia;

export interface VividImageMedia {
  type: 'image';
  url: string;
}

export interface VividVideoMedia {
  thumbnail: string;
  type: 'video';
  url: null | string;
}
