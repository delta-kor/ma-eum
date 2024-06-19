import Icon from '@/components/core/Icon';
import VideoBack from '@/components/video/player/VideoBack';
import { Video } from '@prisma/client';
import { format } from 'date-fns';

interface Props {
  video: Video;
}

export default function VideoHeader({ video }: Props) {
  return (
    <div className="flex items-center gap-16">
      <VideoBack />
      <div className="flex flex-col gap-8">
        <div className="text-18 font-600 leading-6 text-black lg:text-20">{video.title}</div>
        <div className="flex items-center gap-8">
          <Icon type="calendar" className="w-18 shrink-0 text-gray-500" />
          <div className="text-16 font-600 text-gray-500">{format(video.date, 'yy. MM. dd')}</div>
        </div>
      </div>
    </div>
  );
}
