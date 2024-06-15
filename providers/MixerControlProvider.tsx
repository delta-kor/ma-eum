'use client';

import useQuery from '@/hooks/query';
import { ExtendedMusic } from '@/services/music.service';
import { ExtendedSession } from '@/services/session.service';
import { Line, OffsetDelay } from '@/utils/lily.util';
import { Member, Members } from '@/utils/member.util';
import { getVideoRelativeTime } from '@/utils/session.util';
import { StageVideoMeta, getMetaFromVideo } from '@/utils/video.util';
import { Video } from '@prisma/client';
import { ReactNode, createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { YouTubePlayer } from 'react-youtube';

interface Context {
  activeLyrics: [number, Line | null][];
  activeMembers: Member[] | null;
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
  music: ExtendedMusic;
  sessions: ExtendedSession[];
  children: ReactNode;
}

export default function MixerControlProvider({ music, sessions, children }: Props) {
  const query = useQuery();
  const urlVideoId = query.get('videoId');
  const videos = sessions.map(session => session.videos).flat();
  const initialVideo = videos.find(video => video.id === urlVideoId) || sessions[0].videos[0];

  const [selectedVideo, setSelectedVideo] = useState<Video>(initialVideo);
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);

  const [activeLyrics, setActiveLyrics] = useState<[number, Line | null][]>([]);
  const [activeMembers, setActiveMembers] = useState<Member[] | null>([]);

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

    updateActive(currentTime);
  }, [music, player, selectedVideo]);

  const updateActive = useCallback(
    (currentTime: number) => {
      const lines = (music.playData?.lyrics as Line[]) || [];
      const relativeTime = getVideoRelativeTime(music, selectedVideo, currentTime);
      const breakPoints: number[] = lines.map(
        // @ts-ignore
        line => line.chips.find(chip => chip.type === 'text').start
      );
      let lineIndex =
        breakPoints.findIndex(breakPoint => breakPoint! > relativeTime + OffsetDelay) - 1;

      if (lineIndex === -1) lineIndex = 0;
      if (lineIndex === -2) lineIndex = breakPoints.length - 1;

      const slicedLines: [number, Line | null][] = [];
      for (let i = 0; i < 4; i++) {
        const index = lineIndex + i - 1;
        const line = lines[index];
        slicedLines.push([index, line || null]);
      }

      const activeLines = lines.filter(
        line =>
          // @ts-ignore
          line.chips.find(chip => chip.start < relativeTime - OffsetDelay) &&
          // @ts-ignore
          line.chips.findLast(chip => chip.end > relativeTime - OffsetDelay)
      );

      const activeMembersSet = new Set<Member>();
      for (const line of activeLines) {
        if (line.part.length === 0) Members.forEach(member => activeMembersSet.add(member));
        else for (const part of line.part) activeMembersSet.add(part);
      }
      const activeMembers = Array.from(activeMembersSet);

      setActiveLyrics(slicedLines);
      setActiveMembers(activeMembers);
    },
    [music, selectedVideo]
  );

  const handleSelectVideo = useCallback(
    (video: Video) => {
      if (!player) return;

      const currentAnchor = getMetaFromVideo<StageVideoMeta>(video, 'stage')?.time || 0;
      const nextAnchor = getMetaFromVideo<StageVideoMeta>(selectedVideo, 'stage')?.time || 0;
      const delta = nextAnchor - currentAnchor;

      const currentTime = player.getCurrentTime();
      const nextTime = currentTime - delta + 0.2;

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
      activeLyrics,
      activeMembers,
      duration,
      isPlaying,
      play: handlePlay,
      seekTo: handleSeekTo,
      selectVideo: handleSelectVideo,
      setPlayer,
      video: selectedVideo,
    }),
    [activeLyrics, activeMembers, player, selectedVideo, isPlaying, duration]
  );

  return (
    <MixerControlContext.Provider value={value}>
      <MixerControlTimeContext.Provider value={currentTime}>
        {children}
      </MixerControlTimeContext.Provider>
    </MixerControlContext.Provider>
  );
}
