import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Props {
  src: null | string;
}

export default function FluidVideo({ src }: Props) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(false);
  }, [src]);

  function handleLoadStart() {
    setIsActive(false);
  }

  function handleLoadComplete() {
    setIsActive(true);
  }

  return (
    <AnimatePresence mode="wait">
      <motion.video
        key={src}
        animate={src !== null && isActive ? 'visible' : 'hidden'}
        data-active={src !== null && isActive}
        exit="hidden"
        initial="hidden"
        src={src || undefined}
        variants={{
          hidden: { opacity: 0, transition: { duration: 0.5 } },
          visible: { opacity: 0.2, transition: { duration: 0.5 } },
        }}
        onCanPlayThrough={handleLoadComplete}
        onLoadStart={handleLoadStart}
        autoPlay
        disableRemotePlayback
        loop
        muted
        playsInline
        className="absolute inset-0 size-full object-cover opacity-0"
      />
    </AnimatePresence>
  );
}
