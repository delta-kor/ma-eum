import { StageVideoMeta, StageVideoTag, getMetaFromVideo } from '@/utils/video.util';
import { Music, Session, Video } from '@prisma/client';

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
        return '$program_mcountdown';
      case 'musicbank':
        return '$program_musicbank';
      case 'musiccore':
        return '$program_musiccore';
      case 'inkigayo':
        return '$program_inkigayo';
      case 'theshow':
        return '$program_theshow';
      case 'simplykpop':
        return '$program_simplykpop';
      case 'showchampion':
        return '$program_showchampion';
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

export function getShortTagName(tag: StageVideoTag): string {
  switch (tag) {
    case 'main':
      return 'Main';
    case 'full_360':
      return '360°';
    case 'full_hd':
      return 'Full';
    case 'full':
      return 'Full';
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
      return 'Vertical';
    case 'single_face':
      return 'Horizontal';
  }
}

export function getVideoRelativeTime(music: Music, video: Video, absoluteTime: number): number {
  const videoAnchor = getMetaFromVideo<StageVideoMeta>(video, 'stage')?.time || 0;
  const musicAnchor = music.anchor || 0;
  return absoluteTime - (videoAnchor - musicAnchor);
}

export function getVideoAbsoluteTime(music: Music, video: Video, relativeTime: number): number {
  const videoAnchor = getMetaFromVideo<StageVideoMeta>(video, 'stage')?.time || 0;
  const musicAnchor = music.anchor || 0;
  return relativeTime + (videoAnchor - musicAnchor);
}
