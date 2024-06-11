import useMixerControl from '@/hooks/mixer-control';
import useMixerControlTime from '@/hooks/mixer-control-time';
import { ExtendedMusic } from '@/services/music.service';
import { rangePercentage } from '@/utils/lily.util';
import { getVideoAbsoluteTime, getVideoRelativeTime } from '@/utils/session.util';
import { MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent, useRef } from 'react';

interface Props {
  music: ExtendedMusic;
}

export default function MixerTitle({ music }: Props) {
  const mixerControl = useMixerControl();
  const mixerControlTime = useMixerControlTime();

  const boxRef = useRef<HTMLDivElement>(null);

  const title = music.title;
  const video = mixerControl.video;

  const relativeTime = getVideoRelativeTime(music, video, mixerControlTime);
  const musicDuration = music.duration || mixerControl.duration;
  const percentage = rangePercentage((relativeTime / musicDuration) * 100);

  function handleSeek(x: number) {
    if (!boxRef.current) return;

    const { left, width } = boxRef.current.getBoundingClientRect();
    const relativeX = x - left;
    const time = getVideoAbsoluteTime(music, video, (relativeX / width) * musicDuration);
    mixerControl.seekTo(time);
  }

  function handleMouseDown(e: ReactMouseEvent) {
    handleSeek(e.clientX);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp, { once: true });
  }

  function handleMouseMove(e: MouseEvent) {
    e.preventDefault();
    handleSeek(e.clientX);
  }

  function handleMouseUp() {
    window.removeEventListener('mousemove', handleMouseMove);
  }

  function handleTouchStart(e: ReactTouchEvent) {
    handleSeek(e.touches[0].clientX);

    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd, { once: true });
  }

  function handleTouchMove(e: TouchEvent) {
    e.preventDefault();
    handleSeek(e.touches[0].clientX);
  }

  function handleTouchEnd() {
    window.removeEventListener('touchmove', handleTouchMove);
  }

  return (
    <div
      ref={boxRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      className="relative h-details-header-height w-full cursor-pointer overflow-hidden rounded-8 bg-gray-50"
    >
      <div
        style={{
          width: `${percentage}%`,
        }}
        className="h-full bg-gray-200/70"
      />
      <div className="absolute left-0 top-1/2 w-full -translate-y-1/2 select-none text-center text-18 font-600 text-black">
        {title}
      </div>
    </div>
  );
}
