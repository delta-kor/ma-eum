import { ExtendedVideo } from '@/services/video.service';
import { TagOrder } from '@/utils/session.util';
import { StageVideoMeta, getMetaFromVideo } from '@/utils/video.util';

export function sortVideoByTag(videos: ExtendedVideo[]) {
  return videos.sort((a, b) => {
    const aMeta = getMetaFromVideo<StageVideoMeta>(a, 'stage');
    const bMeta = getMetaFromVideo<StageVideoMeta>(b, 'stage');

    return TagOrder.indexOf(aMeta?.tag || 'live') - TagOrder.indexOf(bMeta?.tag || 'live');
  });
}
