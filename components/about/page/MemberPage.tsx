import Icon from '@/components/core/Icon';
import useAbout from '@/hooks/about';
import AboutUtil from '@/utils/about.util';
import { Members } from '@/utils/member.util';
import { motion } from 'framer-motion';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { useEffect, useRef, useState } from 'react';

export default function AboutMemberPage() {
  const { index, page, setPage } = useAbout();
  const [memberIndex, setMemberIndex] = useState(index);
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  const memberInfo = AboutUtil.getMemberInfo(memberIndex);

  useEffect(() => {
    if (page === 'member' && memberIndex !== index) {
      setMemberIndex(index);
    }
  }, [index]);

  useEffect(() => {
    const lottie = lottieRef.current;
    if (lottie) {
      setTimeout(() => {
        lottie.setSpeed(0.8);
        lottie.play();
      }, 400);
    }
  }, [memberIndex]);

  const membersLength = Members.length;

  function handleLeft() {
    setPage('member', (memberIndex - 1 + membersLength) % membersLength);
  }

  function handleRight() {
    setPage('member', (memberIndex + 1) % membersLength);
  }

  if (!memberInfo) return null;

  return (
    <motion.div exit={{ opacity: 0 }} className="relative size-full">
      <div
        onClick={handleLeft}
        className="jelly jelly-increased absolute left-32 top-1/2 z-10 -m-16 -translate-y-1/2 cursor-pointer rounded-8 p-16 hover:bg-white/10 selected:bg-white/10"
      >
        <Icon type="left" className="w-16 text-white" />
      </div>
      <div
        onClick={handleRight}
        className="jelly jelly-increased absolute right-32 top-1/2 z-10 -m-16 -translate-y-1/2 cursor-pointer rounded-8 p-16 hover:bg-white/10 selected:bg-white/10"
      >
        <Icon type="right" className="w-16 text-white" />
      </div>
      <div key={index} className="absolute inset-x-24 bottom-24 flex items-center">
        <div className="flex shrink-0 grow flex-col gap-16">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-6 overflow-hidden">
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                className="text-28 font-400 text-white/30"
              >
                {memberInfo.lastName}
              </motion.div>
              <motion.div
                animate={{ opacity: 1, transition: { delay: 0.1 }, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                className="text-28 font-600 text-white"
              >
                {memberInfo.firstName}
              </motion.div>
            </div>
            <motion.div
              animate={{ opacity: 1, transition: { delay: 0.2 }, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              className="flex items-center gap-8"
            >
              <div className="text-20 font-400 text-white/70">{memberInfo.koreanName}</div>
              <div className="size-3 rounded-full bg-white/30" />
              <div className="text-20 font-400 text-white/70">{memberInfo.birth}</div>
            </motion.div>
          </div>
          <motion.div
            animate={{ opacity: 1, transition: { delay: 0.3 }, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            className="text-16 font-400 text-white/70"
          >
            {memberInfo.position}
          </motion.div>
        </div>
        <Lottie
          animationData={memberInfo.sign}
          autoplay={false}
          loop={false}
          lottieRef={lottieRef}
          className="absolute -right-20 top-1/2 w-[156px] -translate-y-1/2 opacity-30"
        />
      </div>
    </motion.div>
  );
}
