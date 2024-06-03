import LyricsChatBubble from '@/components/play/LyricsChatBubble';
import { Line } from '@/utils/lily.util';
import { Member } from '@/utils/video.util';
import { AnimatePresence } from 'framer-motion';
import { useMemo } from 'react';

interface Props {
  color: string;
  currentTime: number;
  lines: Line[];
}

export default function LyricsChatList({ color, currentTime, lines }: Props) {
  const groups = useMemo(() => {
    const groups: [(Member | null)[], Line[]][] = [];
    for (const line of lines) {
      const lastGroup = groups[groups.length - 1];
      if (lastGroup && lastGroup[0].join(',') === line.part.join(',')) {
        lastGroup[1].push(line);
      } else {
        groups.push([line.part, [line]]);
      }
    }
    return groups;
  }, [lines.length]);

  return (
    <div className="flex min-h-0 grow flex-col items-start justify-end gap-32 overflow-y-hidden">
      <AnimatePresence mode="popLayout">
        {groups.map(
          ([members, lines], index) =>
            groups.length - index < 7 && (
              <LyricsChatBubble
                key={index}
                color={color}
                currentTime={currentTime}
                index={index}
                lines={lines}
                members={members}
              />
            )
        )}
      </AnimatePresence>
    </div>
  );
}
