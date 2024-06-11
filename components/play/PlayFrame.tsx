'use client';

import Icon from '@/components/core/Icon';
import Pc from '@/components/core/responsive/Pc';
import LyricsChatWrapper from '@/components/play/LyricsChatWrapper';
import MusicInfo from '@/components/play/MusicInfo';
import PlayController from '@/components/play/PlayController';
import useHistory from '@/hooks/history';
import { ExtendedMusic } from '@/services/music.service';
import { Album } from '@prisma/client';
import { useCallback, useEffect, useRef, useState } from 'react';
import YouTube, { YouTubeEvent, YouTubePlayer } from 'react-youtube';

interface Props {
  album: Album;
  music: ExtendedMusic;
}

export default function PlayFrame({ album, music }: Props) {
  const [gradientFrom, gradientTo, gradientMid] = album.colors;
  const playData = music.playData!;

  const history = useHistory();

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
    try {
      if (player.getPlayerState() === 1) player.pauseVideo();
      else player.playVideo();
    } catch (e) {
      console.error(e);
    }
  }, [player]);

  const handleSeek = useCallback(
    (time: number) => {
      if (!player) return;
      try {
        player.seekTo(time);
      } catch (e) {
        console.error(e);
      }
    },
    [player]
  );

  const handleBackClick = useCallback(() => {
    history.back();
  }, [history]);

  return (
    <div
      style={{ background: `linear-gradient(180deg, ${gradientFrom} 0%, ${gradientTo} 140%)` }}
      className="relative lg:px-24"
    >
      <Pc>
        <div onClick={handleBackClick} className="absolute right-32 top-32 cursor-pointer p-24">
          <Icon type="close" className="w-32 text-white" />
        </div>
      </Pc>
      <div className="flex h-dvh w-full flex-col gap-16 p-24 pb-36 lg:mx-auto lg:grid lg:max-w-screen-lg lg:grid-cols-[400px_1fr] lg:items-center lg:gap-64 lg:p-0">
        <MusicInfo album={album} music={music}>
          <YouTube
            iframeClassName="size-72 rounded-8 lg:border-3 lg:border-white/70 lg:size-[100%] lg:aspect-square lg:rounded-16"
            opts={{
              playerVars: {
                autoplay: 1,
                controls: 0,
                iv_load_policy: 3,
              },
            }}
            videoId={playData.youtubeId}
            onReady={handleReady}
            className="lg:w-full"
          />
        </MusicInfo>
        <div className="flex min-h-0 grow flex-col gap-16 lg:h-full lg:max-h-[960px] lg:py-64">
          <LyricsChatWrapper
            color={gradientMid}
            currentTime={currentTime}
            music={music}
            playData={playData}
          />
          <PlayController
            currentTime={currentTime}
            duration={duration}
            isPlaying={isPlaying}
            onActionClick={handleActionClick}
            onSeek={handleSeek}
          />
        </div>
      </div>
    </div>
  );
}
