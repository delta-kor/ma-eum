import { TagOrder } from '@/utils/session.util';
import { StageVideoMeta, VideoMetaType, getMetaFromVideo } from '@/utils/video.util';
import { Video } from '@prisma/client';

export function sortVideoByMeta<T extends Video>(array: T[], metaType: VideoMetaType) {
  return array.sort((a, b) => {
    const aMeta = getMetaFromVideo(a, metaType);
    const bMeta = getMetaFromVideo(b, metaType);

    // @ts-ignore
    return (aMeta?.order || -1) - (bMeta?.order || -1);
  });
}

export function sortVideoByTag(videos: Video[]) {
  return videos.sort((a, b) => {
    const aMeta = getMetaFromVideo<StageVideoMeta>(a, 'stage');
    const bMeta = getMetaFromVideo<StageVideoMeta>(b, 'stage');

    return TagOrder.indexOf(aMeta?.tag || 'live') - TagOrder.indexOf(bMeta?.tag || 'live');
  });
}
