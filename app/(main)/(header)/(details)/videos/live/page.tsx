import DetailsContent from '@/components/core/header/DetailsContent';
import LiveVideoList from '@/components/video/LiveVideoList';
import { VideoService } from '@/services/video.service';
import MetaUtil from '@/utils/meta.util';
import { Metadata } from 'next';

export const revalidate = 3600;

export default async function LiveVideosPage() {
  const videosData = VideoService.getLiveVideos();

  const [videos] = await Promise.all([videosData]);

  return (
    <DetailsContent>
      <LiveVideoList videos={videos} />
    </DetailsContent>
  );
}

export function generateMetadata(): Metadata {
  return MetaUtil.getSubpage('Live', 'Watch live videos of CSR(첫사랑).', '/videos/live');
}
