import DetailsContent from '@/components/core/header/DetailsContent';
import CoverVideoList from '@/components/video/CoverVideoList';
import { VideoService } from '@/services/video.service';

export default async function CoverVideosPage() {
  const videosData = VideoService.getCoverVideos(null);

  const [videos] = await Promise.all([videosData]);

  return (
    <DetailsContent>
      <CoverVideoList preloadedVideos={videos} />
    </DetailsContent>
  );
}
