import LyricsChatBubble from '@/components/play/LyricsChatBubble';
import { Line } from '@/utils/lily.util';
import { Member } from '@/utils/video.util';
import { AnimatePresence } from 'framer-motion';
import { useMemo } from 'react';

interface Props {
  lines: Line[];
}

export default function LyricsChatList({ lines }: Props) {
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
    <div className="-mx-24 -mb-24 flex min-h-0 grow flex-col items-start justify-end gap-32 overflow-hidden px-24 pb-24">
      <AnimatePresence mode="popLayout">
        {groups.map(
          ([members, lines], index) =>
            groups.length - index < 8 && (
              <LyricsChatBubble key={index} index={index} lines={lines} members={members} />
            )
        )}
      </AnimatePresence>
    </div>
  );
}
