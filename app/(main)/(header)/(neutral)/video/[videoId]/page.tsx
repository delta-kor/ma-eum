import VideoPlayerFrame from '@/components/video/player/VideoPlayerFrame';
import { VideoService } from '@/services/video.service';
import MetaUtil from '@/utils/meta.util';
import { Video } from '@prisma/client';
import { notFound } from 'next/navigation';

export const revalidate = 0;

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

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params: { videoId } }: Props) {
  const video: Video | null = await VideoService.getOne(videoId);
  if (!video) return notFound();

  return MetaUtil.getVideoPage(video.id, video.sourceId, video.title);
}
