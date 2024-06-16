import { VideoService } from '@/services/video.service';

export const revalidate = 0;

interface Props {
  params: {
    videoId: string;
  };
}

export default async function VideoPage({ params: { videoId } }: Props) {
  const video = await VideoService.getOne(videoId);

  return (
    <div className="px-24">
      <div className="flex flex-col gap-16"></div>
    </div>
  );
}
