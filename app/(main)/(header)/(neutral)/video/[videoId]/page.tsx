import VideoPlayerFrame from '@/components/video/player/VideoPlayerFrame';
import { VideoService } from '@/services/video.service';
import { notFound } from 'next/navigation';

export const revalidate = 3600;

interface Props {
  params: {
    videoId: string;
  };
}

export default async function VideoPage({ params: { videoId } }: Props) {
  const video = await VideoService.getOneWithCategory(videoId);
  if (!video) return notFound();

  return (
    <div className="px-24 pb-24 lg:mt-artistic-header-height-lg lg:pt-16">
      <VideoPlayerFrame video={video} />
    </div>
  );
}
