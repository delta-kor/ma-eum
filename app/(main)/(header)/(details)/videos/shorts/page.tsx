import DetailsContent from '@/components/core/header/DetailsContent';
import ShortsVideoList from '@/components/video/ShortsVideoList';
import { VideoService } from '@/services/video.service';
import MetaUtil from '@/utils/meta.util';
import { Metadata } from 'next';

export const revalidate = 3600;

export default async function ChallengeVideosPage() {
  const videosData = VideoService.getShortsVideos({ cursor: null, limit: 30 });

  const [videos] = await Promise.all([videosData]);

  return (
    <DetailsContent>
      <ShortsVideoList preloadedVideos={videos} />
    </DetailsContent>
  );
}

export function generateMetadata(): Metadata {
  return MetaUtil.getSubpage('Shorts', 'Watch shorts of CSR(첫사랑).', '/videos/shorts');
}
