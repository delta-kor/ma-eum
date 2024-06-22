import LazyImage from '@/components/core/LazyImage';
import Translate from '@/components/core/Translate';
import LyricsChatChip from '@/components/play/LyricsChatChip';
import { Line } from '@/utils/lily.util';
import { Member, getMemberName } from '@/utils/member.util';
import { ImageUrl } from '@/utils/url.util';
import { AnimatePresence, motion } from 'framer-motion';
import { Fragment } from 'react';

interface Props {
  color: string;
  currentTime: number;
  index: number;
  lines: Line[];
  members: (Member | null)[];
}

export default function LyricsChatBubble({ color, currentTime, index, lines, members }: Props) {
  if (members.length === 0) members = [null];
  const profileMember = members.length > 1 ? null : members[0];

  const transition = { duration: 0.5, ease: 'circOut' };

  return (
    <motion.div
      key={index}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      initial={{ opacity: 1, scale: 0 }}
      transition={transition}
      className="flex min-w-0 items-start gap-12"
    >
      <motion.div
        layout="position"
        layoutId={`lyrics-chat-bubble-${index}`}
        transition={transition}
      >
        <LazyImage
          src={ImageUrl.member(profileMember)}
          className="size-[42px] shrink-0 rounded-full border-3 border-white bg-gray-100"
        />
      </motion.div>
      <div className="flex min-w-0 flex-col items-start justify-end gap-6">
        <motion.div
          layout="position"
          layoutId={`lyrics-member-${index}`}
          transition={transition}
          className="text-16 font-600 text-white"
        >
          {members.map((member, index) => (
            <Fragment key={member}>
              <Translate>{getMemberName(member)}</Translate>
              {index < members.length - 1 ? ' & ' : ''}
            </Fragment>
          ))}
        </motion.div>
        <motion.div
          layoutId={`lyrics-bubble-${index}`}
          transition={transition}
          layout
          className="flex flex-col items-start justify-end gap-10 rounded-8 bg-white p-16"
        >
          <AnimatePresence>
            {lines.map((line, lineIndex) => (
              <motion.div
                key={lineIndex}
                animate={{ scale: 1 }}
                initial={{ scale: 0 }}
                layoutId={`lyrics-text-${index}-${lineIndex}`}
                transition={transition}
                className="flex flex-wrap"
              >
                {line.chips.map((chip, chipIndex) => (
                  <LyricsChatChip
                    key={chipIndex}
                    chip={chip}
                    color={color}
                    currentTime={currentTime}
                  />
                ))}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}
