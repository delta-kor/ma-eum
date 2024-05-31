import DetailsContent from '@/components/core/header/DetailsContent';
import LiveVideoList from '@/components/video/LiveVideoList';
import { VideoService } from '@/services/video.service';

export default async function LiveVideosPage() {
  const videosData = VideoService.getLiveVideos();

  const [videos] = await Promise.all([videosData]);

  return (
    <DetailsContent>
      <LiveVideoList videos={videos} />
    </DetailsContent>
  );
}
