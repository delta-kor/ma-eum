import useMixerControl from '@/hooks/mixer-control';
import useMixerControlTime from '@/hooks/mixer-control-time';
import { ExtendedMusic } from '@/services/music.service';
import { rangePercentage } from '@/utils/lily.util';
import { StageVideoMeta, getMetaFromVideo } from '@/utils/video.util';
import { MouseEvent } from 'react';

interface Props {
  music: ExtendedMusic;
}

export default function MixerTitle({ music }: Props) {
  const mixerControl = useMixerControl();
  const mixerControlTime = useMixerControlTime();

  const title = music.title;
  const video = mixerControl.video;

  const videoAnchor = getMetaFromVideo<StageVideoMeta>(video, 'stage')?.time || 0;
  const musicAnchor = music.anchor || 0;

  const musicDuration = music.duration || mixerControl.duration;
  const relativeTime = mixerControlTime - (videoAnchor - musicAnchor);
  const percentage = rangePercentage((relativeTime / musicDuration) * 100);

  function handleSeek(e: MouseEvent<HTMLDivElement>) {
    const { clientX, currentTarget: target } = e;
    const { left, width } = target.getBoundingClientRect();
    const relativeX = clientX - left;
    const time = (relativeX / width) * musicDuration + videoAnchor - musicAnchor;
    mixerControl.seekTo(time);
  }

  return (
    <div
      onClick={handleSeek}
      className="relative h-details-header-height w-full cursor-pointer overflow-hidden rounded-8 bg-gray-50"
    >
      <div
        style={{
          width: `${percentage}%`,
        }}
        className="h-full bg-gray-200/70"
      />
      <div className="absolute left-0 top-1/2 w-full -translate-y-1/2 text-center text-18 font-600 text-black">
        {title}
      </div>
    </div>
  );
}
