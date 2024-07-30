import useAbout from '@/hooks/about';
import { AboutPage } from '@/providers/AboutProvider';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import { useState } from 'react';

export default function AboutLandingPage() {
  const about = useAbout();
  const [isActive, setIsActive] = useState(false);

  function handleComplete() {
    setIsActive(true);
  }

  function handleActionClick(page: AboutPage) {
    about.setPage(page, 0);
  }

  return (
    <motion.div
      exit={{ opacity: 0 }}
      className="relative flex size-full flex-col items-center justify-center"
    >
      <div>
        <Lottie
          animationData={require('@/public/lottie/about-csr.json')}
          loop={false}
          onComplete={handleComplete}
        />
      </div>
      {isActive && (
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 1, type: 'spring' }}
          className="absolute inset-x-24 bottom-24 flex flex-col gap-12"
        >
          <div
            onClick={() => handleActionClick('introduction')}
            className="jelly jelly-reduced cursor-pointer rounded-16 bg-white px-12 py-16 text-center text-20 font-600 text-black hover:scale-[1.02]"
          >
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
    </motion.div>
  );
}
