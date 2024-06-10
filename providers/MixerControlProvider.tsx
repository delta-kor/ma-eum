'use client';

import { ExtendedMusic } from '@/services/music.service';
import { ExtendedSession } from '@/services/session.service';
import { Video } from '@prisma/client';
import { ReactNode, createContext, useState } from 'react';

interface Context {
  currentTime: number;
  video: Video;

  onTimeChange: (time: number) => void;
}

export const MixerControlContext = createContext<Context>({} as Context);

interface Props {
  music: ExtendedMusic;
  sessions: ExtendedSession[];
  children: ReactNode;
}

export default function MixerControlProvider({ music, sessions, children }: Props) {
  const initialSession = sessions[0];
  const initialVideo = initialSession.videos[0];

  const [currentTime, setCurrentTime] = useState<number>(0);
  const [selectedVideo, setSelectedVideo] = useState<Video>(initialVideo);

  function handleTimeChange(time: number) {
    setCurrentTime(time);
  }

  const value: Context = {
    currentTime,
    video: selectedVideo,
    onTimeChange: handleTimeChange,
  };

  return <MixerControlContext.Provider value={value}>{children}</MixerControlContext.Provider>;
}
