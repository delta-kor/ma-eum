'use client';

import { Video } from '@prisma/client';
import { ReactNode, createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { YouTubePlayer } from 'react-youtube';

interface Context {
  duration: number;
  isPlaying: boolean;
  setPlayer: (player: YouTubePlayer) => void;
  video: Video;
}

export const MixerControlContext = createContext<Context>({} as Context);
export const MixerControlTimeContext = createContext<number>(0);

interface Props {
  initialVideo: Video;
  children: ReactNode;
}

export default function MixerControlProvider({ initialVideo, children }: Props) {
  const [selectedVideo, setSelectedVideo] = useState<Video>(initialVideo);
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);

  const intervalRef = useRef<any>();

  useEffect(() => {
    intervalRef.current = setInterval(updateCurrentTime, 1000 / 30);
    return () => clearInterval(intervalRef.current);
  }, [player]);

  const updateCurrentTime = useCallback(() => {
    if (!player) return;
    const currentTime = player.getCurrentTime();
    setCurrentTime(currentTime);

    const duration = player.getDuration();
    setDuration(duration);

    const playerState = player.getPlayerState();
    const isPlaying = playerState === 1 || playerState === 3;
    setIsPlaying(isPlaying);
  }, [player]);

  const value: Context = useMemo(
    () => ({
      duration,
      isPlaying,
      setPlayer,
      video: selectedVideo,
    }),
    [player, selectedVideo, isPlaying, duration]
  );

  return (
    <MixerControlContext.Provider value={value}>
      <MixerControlTimeContext.Provider value={currentTime}>
        {children}
      </MixerControlTimeContext.Provider>
    </MixerControlContext.Provider>
  );
}
