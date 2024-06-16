import { Member } from '@/utils/member.util';
import { StageVideoTag } from '@/utils/video.util';

export interface VoyageSession {
  date: string;
  program: string;
  videos: VoyageVideo[];
}

export interface VoyageVideo {
  member: null | string;
  tag: StageVideoTag;
  time: number;
  title: string;
  youtubeId: string;
}

export function getCSRMemberByVoyageMember(member: null | string): Member | null {
  switch (member) {
    case '금희':
      return 'geumhee';
    case '시현':
      return 'sihyeon';
    case '서연':
      return 'seoyeon';
    case '유나':
      return 'yuna';
    case '두나':
      return 'duna';
    case '수아':
      return 'sua';
    case '예함':
      return 'yeham';
    default:
      return null;
  }
}
