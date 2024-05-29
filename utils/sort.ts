import { VideoMetaType, getMetaFromVideo } from '@/utils/video';
import { Video } from '@prisma/client';

export function sortVideoByMeta<T extends Video>(array: T[], metaType: VideoMetaType) {
  return array.sort((a, b) => {
    const aMeta = getMetaFromVideo(a, metaType);
    const bMeta = getMetaFromVideo(b, metaType);

    // @ts-ignore
    return (aMeta?.order || -1) - (bMeta?.order || -1);
  });
}
