import DetailsContent from '@/components/core/header/DetailsContent';
import ShortsVideoList from '@/components/video/ShortsVideoList';
import { VideoService } from '@/services/video.service';

export const revalidate = 3600;

export default async function ChallengeVideosPage() {
  const videosData = VideoService.getShortsVideos({ cursor: null, limit: 24 });

  const [videos] = await Promise.all([videosData]);

  return (
    <DetailsContent>
      <ShortsVideoList preloadedVideos={videos} />
    </DetailsContent>
  );
}
