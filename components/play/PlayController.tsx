import Icon from '@/components/core/Icon';
import { getTime } from '@/utils/date.util';
import { MouseEvent, useCallback, useRef } from 'react';

interface Props {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  onActionClick: () => void;
  onSeek: (time: number) => void;
}

export default function PlayController({
  currentTime,
  duration,
  isPlaying,
  onActionClick,
  onSeek,
}: Props) {
  const percentage = duration ? (currentTime / duration) * 100 : 0;
  const barRef = useRef<HTMLDivElement>(null);

  const handleActionClick = useCallback(() => {
    onActionClick();
  }, [onActionClick]);

  const handleBarClick = useCallback(
    (e: MouseEvent) => {
      if (!barRef.current) return;
      const { left, width } = barRef.current.getBoundingClientRect();
      const clickX = e.clientX;
      const time = duration * ((clickX - left) / width);
      onSeek(time);
    },
    [duration, onSeek]
  );

  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-col gap-8">
        <div
          ref={barRef}
          onClick={handleBarClick}
          className="h-12 cursor-pointer overflow-hidden rounded-full bg-white/30"
        >
          <div style={{ width: `${percentage}%` }} className="h-full rounded-full bg-white" />
        </div>
        <div className="flex items-center justify-between">
          <div className="text-14 font-500 text-white/70">{getTime(currentTime)}</div>
          <div className="text-14 font-500 text-white/70">{getTime(duration)}</div>
        </div>
      </div>
      <Icon
        type={isPlaying ? 'pause' : 'play'}
        onClick={handleActionClick}
        className="w-48 cursor-pointer self-center text-white"
      />
    </div>
  );
}
