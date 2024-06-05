import LyricsChatBubble from '@/components/play/LyricsChatBubble';
import { Line } from '@/utils/lily.util';
import { Member } from '@/utils/video.util';
import { Music } from '@prisma/client';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo } from 'react';

interface Props {
  color: string;
  currentTime: number;
  lines: Line[];
  music: Music;
}

export default function LyricsChatList({ color, currentTime, lines, music }: Props) {
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
    <div className="flex min-h-0 grow items-end">
      <AnimatePresence mode="wait">
        {groups.length > 0 ? (
          <motion.div
            key="bubbles"
            className="flex h-full flex-col items-start justify-end gap-32 overflow-y-hidden"
          >
            {groups.map(
              ([members, lines], index) =>
                groups.length - index <= 8 && (
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
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            animate={{ opacity: 1, transition: { duration: 0.4 } }}
            exit={{ scale: 0, transition: { duration: 0.7, ease: 'backIn' } }}
            initial={{ opacity: 0 }}
            className="flex flex-col"
          >
            <div className="text-24 font-600 text-white">(Intro)</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
