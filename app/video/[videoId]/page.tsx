import VideoHeader from '@/components/video/player/VideoHeader';
import VideoPlayer from '@/components/video/player/VideoPlayer';
import { VideoService } from '@/services/video.service';
import { notFound } from 'next/navigation';

export const revalidate = 0;

interface Props {
  params: {
    videoId: string;
  };
}

export default async function VideoPage({ params: { videoId } }: Props) {
  const video = await VideoService.getOne(videoId);
  if (!video) return notFound();

  return (
    <div className="px-24">
      <div className="flex flex-col gap-16">
        <VideoPlayer source={video.source} sourceId={video.sourceId} />
        <VideoHeader video={video} />
      </div>
    </div>
  );
}
