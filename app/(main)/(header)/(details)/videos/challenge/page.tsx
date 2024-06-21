import DetailsContent from '@/components/core/header/DetailsContent';
import ChallengeVideoList from '@/components/video/ChallengeVideoList';
import { VideoService } from '@/services/video.service';

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
