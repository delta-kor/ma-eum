import DetailsContent from '@/components/core/header/DetailsContent';
import ChallengeVideoList from '@/components/video/ChallengeVideoList';
import { VideoService } from '@/services/video.service';
import MetaUtil from '@/utils/meta.util';
import { Metadata } from 'next';

export const revalidate = 3600;

export default async function ChallengeVideosPage() {
  const videosData = VideoService.getChallengeVideos(null, { cursor: null, limit: 20 });

  const [videos] = await Promise.all([videosData]);

  return (
    <DetailsContent>
      <ChallengeVideoList preloadedVideos={videos} />
    </DetailsContent>
  );
}

export function generateMetadata(): Metadata {
  return MetaUtil.getSubpage(
    'Challenge',
    'Watch challenge videos of CSR(첫사랑).',
    '/videos/challenge'
  );
}
