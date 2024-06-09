import { StageVideoTag } from '@/utils/video.util';
import { Session, Video } from '@prisma/client';

export interface ExtendedSession extends Session {
  videos: Video[];
}

export const TagOrder: StageVideoTag[] = [
  'main',
  'full_360',
  'full_hd',
  'full',
  '1take',
  'tower',
  'side',
  'live',
  'rehearsal',
  'single_full',
  'single_face',
];

export function getSessionTitle(session: Session): string {
  if (session.program) {
    switch (session.program) {
      case 'mcountdown':
        return '엠카운트다운';
      case 'musicbank':
        return '뮤직뱅크';
      case 'musiccore':
        return '음악중심';
      case 'inkigayo':
        return '인기가요';
      case 'theshow':
        return '더쇼';
      case 'simplykpop':
        return '심플리케이팝';
      case 'showchampion':
        return '쇼 챔피언';
    }
  }
  return session.title;
}

export function getTagName(tag: StageVideoTag): string {
  switch (tag) {
    case 'main':
      return 'Main';
    case 'full_360':
      return '360°';
    case 'full_hd':
      return 'Full Cam (UHD)';
    case 'full':
      return 'Full Cam';
    case '1take':
      return 'One Take';
    case 'tower':
      return 'Tower';
    case 'side':
      return 'Side';
    case 'live':
      return 'Live';
    case 'rehearsal':
      return 'Rehearsal';
    case 'single_full':
      return 'Vertical Cam';
    case 'single_face':
      return 'Horizontal Cam';
  }
}
