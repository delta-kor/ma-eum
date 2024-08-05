'use client';

import Icon from '@/components/core/Icon';
import { motion } from 'framer-motion';
import { DateTime } from 'luxon';
import Link from 'next/link';

export default function LandingWidget() {
  const today = DateTime.local({ zone: 'Asia/Seoul' });
  const debut = DateTime.local(2022, 7, 27, { zone: 'Asia/Seoul' });
  const day = Math.floor(today.diff(debut, 'days').days) + 1;

  return (
    <Link
      href={'/about'}
      scroll={false}
      className="jelly glow-primary absolute bottom-0 left-1/2 flex -translate-x-1/2 translate-y-1/2 items-center gap-12 rounded-16 bg-gradient-primary px-16 py-8 hover:scale-105 lg:static lg:translate-x-0 lg:translate-y-0"
    >
      <Icon type="csr" className="h-20 text-white" />
      <div suppressHydrationWarning className="text-22 font-700 text-white">
        D+{day}
      </div>
      <motion.div
        animate={{ x: 3 }}
        initial={{ x: -3 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 0.3, repeatType: 'mirror' }}
      >
        <Icon type="right" className="w-14 text-white" />
      </motion.div>
    </Link>
  );
}
