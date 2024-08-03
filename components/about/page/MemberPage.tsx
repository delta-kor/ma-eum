import useAbout from '@/hooks/about';
import AboutUtil from '@/utils/about.util';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import { useState } from 'react';

export default function AboutMemberPage() {
  const { index, page } = useAbout();
  const [memberIndex, setMemberIndex] = useState(index);
  const memberInfo = AboutUtil.getMemberInfo(memberIndex);

  if (!memberInfo) return null;

  return (
    <motion.div
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      className="relative size-full"
    >
      <div className="absolute inset-x-24 bottom-24 flex items-center">
        <div className="flex shrink-0 grow flex-col gap-16">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-6">
              <div className="text-28 font-400 text-white/30">{memberInfo.lastName}</div>
              <div className="text-28 font-600 text-white">{memberInfo.firstName}</div>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-20 font-400 text-white/70">{memberInfo.koreanName}</div>
              <div className="size-3 rounded-full bg-white/30" />
              <div className="text-20 font-400 text-white/70">{memberInfo.birth}</div>
            </div>
          </div>
          <div className="text-16 font-400 text-white/70">{memberInfo.position}</div>
        </div>
        <Lottie
          animationData={memberInfo.sign}
          loop={false}
          className="absolute -right-20 top-1/2 w-[156px] -translate-y-1/2 opacity-30"
        />
      </div>
    </motion.div>
  );
}
