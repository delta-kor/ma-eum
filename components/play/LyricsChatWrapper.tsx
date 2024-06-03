import LyricsChatList from '@/components/play/LyricsChatList';
import { Line, LineOffsetDelay } from '@/utils/lily.util';
import { MusicPlayData } from '@prisma/client';
import { useMemo } from 'react';

interface Props {
  color: string;
  currentTime: number;
  playData: MusicPlayData;
}

export default function LyricsChatWrapper({ color, currentTime, playData }: Props) {
  const lyrics = playData.lyrics! as Line[];

  const firstToCurrentLyrics = useMemo(() => {
    // @ts-ignore
    const breakPoints = lyrics.map(line => line.chips.find(chip => chip.type === 'text').start);
    const firstInactiveLineIndex = breakPoints.findIndex(
      breakPoint => breakPoint! > currentTime + LineOffsetDelay
    );
    const lastActiveLineIndex =
      firstInactiveLineIndex === -1 ? breakPoints.length - 1 : firstInactiveLineIndex - 1;
    return lyrics.slice(0, lastActiveLineIndex === -1 ? 0 : lastActiveLineIndex + 1);
  }, [currentTime, lyrics]);

  return <LyricsChatList lines={firstToCurrentLyrics} />;
}
