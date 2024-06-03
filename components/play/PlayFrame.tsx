'use client';

import LyricsChatWrapper from '@/components/play/LyricsChatWrapper';
import MusicInfo from '@/components/play/MusicInfo';
import PlayController from '@/components/play/PlayController';
import { MusicWithPlayData } from '@/services/music.service';
import { Album } from '@prisma/client';
import { useCallback, useEffect, useRef, useState } from 'react';
import YouTube, { YouTubeEvent, YouTubePlayer } from 'react-youtube';

interface Props {
  album: Album;
  music: MusicWithPlayData;
}

export default function PlayFrame({ album, music }: Props) {
  const [gradientFrom, gradientTo, gradientMid] = album.colors;
  const playData = music.playData!;

  const [player, setPlayer] = useState<YouTubePlayer | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const intervalRef = useRef<any>();

  useEffect(() => {
    intervalRef.current = setInterval(updateCurrentTime, 1000 / 30);
    return () => clearInterval(intervalRef.current);
  }, [player]);

  const updateCurrentTime = useCallback(() => {
    if (!player) return;
    setCurrentTime(player.getCurrentTime());

    const playerState = player.getPlayerState();
    setIsPlaying(playerState === 1 || playerState === 3);
  }, [player]);

  const handleReady = useCallback((e: YouTubeEvent) => {
    setPlayer(e.target);
    setDuration(e.target.getDuration());
  }, []);

  const handleActionClick = useCallback(() => {
    if (!player) return;
    if (player.getPlayerState() === 1) player.pauseVideo();
    else player.playVideo();
  }, [player]);

  const handleSeek = useCallback(
    (time: number) => {
      if (!player) return;
      player.seekTo(time);
    },
    [player]
  );

  return (
    <div
      style={{ background: `linear-gradient(180deg, ${gradientFrom} 0%, ${gradientTo} 140%)` }}
      className="flex h-dvh w-full flex-col gap-16 p-24 pb-36"
    >
      <MusicInfo album={album} music={music}>
        <YouTube
          iframeClassName="size-72 rounded-8"
          videoId={playData.youtubeId}
          onReady={handleReady}
        />
      </MusicInfo>
      <LyricsChatWrapper color={gradientMid} currentTime={currentTime} playData={playData} />
      <PlayController
        currentTime={currentTime}
        duration={duration}
        isPlaying={isPlaying}
        onActionClick={handleActionClick}
        onSeek={handleSeek}
      />
    </div>
  );
}
