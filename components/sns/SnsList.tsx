import YoutubeSnsFeed from '@/components/sns/YoutubeSnsFeed';
import { VideoService } from '@/services/video.service';

export default async function SnsList() {
  const videos = await VideoService.getRecentYoutubeVideos(12);

  return (
    <div className="flex flex-col">
      <YoutubeSnsFeed videos={videos} />
    </div>
  );
}
