'use client';

import { StageVideoMeta, getMetaFromVideo } from '@/utils/video.util';
import { Music, Video } from '@prisma/client';
import { ReactNode, createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { YouTubePlayer } from 'react-youtube';

interface Context {
  duration: number;
  isPlaying: boolean;
  play: () => void;
  seekTo: (time: number) => void;
  selectVideo: (video: Video) => void;
  setPlayer: (player: YouTubePlayer) => void;
  video: Video;
}

export const MixerControlContext = createContext<Context>({} as Context);
export const MixerControlTimeContext = createContext<number>(0);

interface Props {
  initialVideo: Video;
  music: Music;
  children: ReactNode;
}

export default function MixerControlProvider({ initialVideo, music, children }: Props) {
  const [selectedVideo, setSelectedVideo] = useState<Video>(initialVideo);
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);

  const intervalRef = useRef<any>();

  useEffect(() => {
    intervalRef.current = setInterval(updateCurrentTime, 1000 / 30);
    return () => clearInterval(intervalRef.current);
  }, [player, selectedVideo]);

  const updateCurrentTime = useCallback(() => {
    if (!player) return;

    const currentTime = player.getCurrentTime();
    setCurrentTime(currentTime);

    const duration = player.getDuration();
    setDuration(duration);

    const playerState = player.getPlayerState();
    const isPlaying = playerState === 1 || playerState === 3;
    setIsPlaying(isPlaying);
  }, [player, selectedVideo]);

  const handleSelectVideo = useCallback(
    (video: Video) => {
      if (!player) return;

      const currentAnchor = getMetaFromVideo<StageVideoMeta>(video, 'stage')?.time || 0;
      const nextAnchor = getMetaFromVideo<StageVideoMeta>(selectedVideo, 'stage')?.time || 0;
      const delta = nextAnchor - currentAnchor;

      const currentTime = player.getCurrentTime();
      const nextTime = currentTime - delta;

      player.loadVideoById(video.sourceId, nextTime);
      setSelectedVideo(video);
    },
    [player, selectedVideo]
  );

  const handleSeekTo = useCallback(
    (time: number) => {
      if (!player) return;
      player.seekTo(time);
    },
    [player]
  );

  const handlePlay = useCallback(() => {
    if (!player) return;
    player.playVideo();
  }, [player]);

  const value: Context = useMemo(
    () => ({
      duration,
      isPlaying,
      play: handlePlay,
      seekTo: handleSeekTo,
      selectVideo: handleSelectVideo,
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
