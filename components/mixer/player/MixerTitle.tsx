import Icon from '@/components/core/Icon';
import useMixerControl from '@/hooks/mixer-control';
import useMixerControlTime from '@/hooks/mixer-control-time';
import { ExtendedMusic } from '@/services/music.service';
import { rangePercentage } from '@/utils/lily.util';
import { getVideoAbsoluteTime, getVideoRelativeTime } from '@/utils/session.util';
import { AnimatePresence, motion } from 'framer-motion';
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
    if (relativeTime < 0) return handleSkip();

    const { left, width } = boxRef.current.getBoundingClientRect();
    const relativeX = x - left;
    const time = getVideoAbsoluteTime(music, video, (relativeX / width) * musicDuration);
    mixerControl.seekTo(time);
    mixerControl.play();
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

  function handleSkip() {
    const time = getVideoAbsoluteTime(music, video, 0);
    mixerControl.seekTo(time);
    mixerControl.play();
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
      <AnimatePresence mode="wait">
        {relativeTime >= 0 && (
          <motion.div
            key="title"
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            className="absolute left-0 top-1/2 w-full -translate-y-1/2 select-none text-center text-18 font-600 text-black"
          >
            {title}
          </motion.div>
        )}
        {relativeTime < 0 && (
          <motion.div
            key="skip"
            animate={{ opacity: 1, top: '50%' }}
            exit={{ opacity: 0, top: -100 }}
            initial={{ opacity: 0, top: -100 }}
            className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 select-none items-center gap-4 rounded-8 bg-gray-200 px-12 py-4 text-center text-16 font-500 text-black"
          >
            Skip Intro
            <Icon type="right" className="size-12 text-black" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
