import VideoHeader from '@/components/video/player/VideoHeader';
import VideoPlayer from '@/components/video/player/VideoPlayer';
import VideoShare from '@/components/video/player/VideoShare';
import MusicMetaCard from '@/components/video/player/meta/MusicMetaCard';
import { VideoService } from '@/services/video.service';
import { MusicVideoMeta, getMetaFromVideo } from '@/utils/video.util';
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

  const musicMeta = getMetaFromVideo<MusicVideoMeta>(video, 'music');

  return (
    <div className="px-24">
      <div className="flex flex-col gap-16">
        <VideoPlayer source={video.source} sourceId={video.sourceId} />
        <VideoHeader video={video} />
        <VideoShare source={video.source} sourceId={video.sourceId} title={video.title} />
        <div className="flex flex-col gap-16">
          {musicMeta && <MusicMetaCard meta={musicMeta} />}
        </div>
      </div>
    </div>
  );
}
