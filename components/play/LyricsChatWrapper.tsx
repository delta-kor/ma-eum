import LyricsChatList from '@/components/play/LyricsChatList';
import { IntroDelay, Line, LineOffsetDelay, TextChip } from '@/utils/lily.util';
import { Music, MusicPlayData } from '@prisma/client';
import { useMemo } from 'react';

interface Props {
  color: string;
  currentTime: number;
  music: Music;
  playData: MusicPlayData;
}

export default function LyricsChatWrapper({ color, currentTime, music, playData }: Props) {
  const lyrics = playData.lyrics! as Line[];

  const firstToCurrentLyrics = useMemo(() => {
    if (currentTime === 0) return [];

    // @ts-ignore
    const breakPoints = lyrics.map(line => line.chips.find(chip => chip.type === 'text').start);
    const firstInactiveLineIndex = breakPoints.findIndex(
      breakPoint => breakPoint! > currentTime + LineOffsetDelay
    );
    const lastActiveLineIndex =
      firstInactiveLineIndex === -1 ? breakPoints.length - 1 : firstInactiveLineIndex - 1;
    if (lastActiveLineIndex === -1) {
      const firstLine = lyrics[0];
      const firstChip = firstLine.chips.find(chip => chip.type === 'text') as TextChip;
      const firstLineTime = firstChip.start;
      if (currentTime + LineOffsetDelay + IntroDelay > firstLineTime) return [firstLine];
      else return [];
    } else return lyrics.slice(0, lastActiveLineIndex + 1);
  }, [currentTime, lyrics]);

  return (
    <LyricsChatList
      color={color}
      currentTime={currentTime}
      lines={firstToCurrentLyrics}
      music={music}
    />
  );
}
