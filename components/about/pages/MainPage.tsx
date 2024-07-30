import CloseButton from '@/components/about/ui/CloseButton';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import { useState } from 'react';

export default function AboutMainPage() {
  const [isActive, setIsActive] = useState(false);

  function handleComplete() {
    setIsActive(true);
  }

  return (
    <div className="relative flex size-full flex-col items-center justify-center">
      <CloseButton />
      <div>
        <Lottie
          animationData={require('@/public/lottie/about-csr.json')}
          loop={false}
          onComplete={handleComplete}
        />
      </div>
      {isActive && (
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.8 }}
          transition={{ bounce: 0.4, duration: 0.8, type: 'spring' }}
          className="absolute inset-x-24 bottom-24 flex flex-col gap-12"
        >
          <div className="jelly jelly-reduced cursor-pointer rounded-16 bg-white px-12 py-16 text-center text-20 font-600 text-black hover:scale-[1.02]">
            Introduction
          </div>
          <div className="flex items-center gap-12">
            <div className="jelly grow basis-0 cursor-pointer rounded-16 bg-white/20 px-12 py-16 text-center text-20 font-400 text-white hover:scale-[1.02]">
              Profile
            </div>
            <div className="jelly grow basis-0 cursor-pointer rounded-16 bg-white/20 px-12 py-16 text-center text-20 font-400 text-white hover:scale-[1.02]">
              Discography
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
