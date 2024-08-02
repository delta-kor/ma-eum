import useAbout from '@/hooks/about';
import AboutUtil from '@/utils/about.util';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

export default function AboutProfilePage() {
  const { setPage } = useAbout();
  const [active, setActive] = useState<null | number>(null);

  const imageSize = AboutUtil.getProfileImageSize();
  const imageFaces = AboutUtil.getProfileImageFaces();
  const imageBoxes = AboutUtil.getProfileImageBoxes();

  const mergedBoxes = [...imageBoxes, ...imageFaces.map((item, index) => [index, ...item])];

  function handleFocus(id: number) {
    setActive(id);
  }

  function handleSelect(id: number) {
    setPage('member', id);
  }

  return (
    <motion.div
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      className="relative flex size-full flex-col items-center justify-center gap-12 overflow-hidden px-24 py-[96px]"
    >
      <div className="shrink-0 self-start text-20 font-600 text-white">Tap on the member</div>
      <div className="relative aspect-[1000/1499] max-h-full w-full overflow-hidden rounded-16">
        <div className="absolute top-1/2 -translate-y-1/2">
          <Image
            alt="CSR"
            src={AboutUtil.getProfileImage()}
            className="h-full object-cover opacity-60"
          />
          {mergedBoxes.map(([id, x, y, width, height], index) => (
            <motion.div
              key={index}
              style={{
                height: `${(height / imageSize[1]) * 100}%`,
                left: `${(x / imageSize[0]) * 100}%`,
                top: `${(y / imageSize[1]) * 100}%`,
                width: `${(width / imageSize[0]) * 100}%`,
              }}
              onHoverStart={() => handleFocus(id)}
              onTap={() => handleFocus(id)}
              className="absolute cursor-pointer"
            />
          ))}
          {imageFaces.map(
            ([x, y, width, height], index) =>
              index === active && (
                <motion.div
                  key="active"
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  style={{
                    height: `${(height / imageSize[1]) * 100}%`,
                    left: `${(x / imageSize[0]) * 100}%`,
                    top: `${(y / imageSize[1]) * 100}%`,
                    width: `${(width / imageSize[0]) * 100}%`,
                  }}
                  transition={{ duration: 0.2, ease: 'circInOut' }}
                  onClick={() => handleSelect(index)}
                  layout
                  className="absolute cursor-pointer rounded-8 border-3 border-white/70"
                />
              )
          )}
        </div>
      </div>
    </motion.div>
  );
}
