import AboutUtil from '@/utils/about.util';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutProfilePage() {
  const imageSize = AboutUtil.getProfileImageSize();
  const imageFaces = AboutUtil.getProfileImageFaces();

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
          {imageFaces.map(([x, y, width, height], index) => (
            <div
              key={index}
              style={{
                height: `${(height / imageSize[1]) * 100}%`,
                left: `${(x / imageSize[0]) * 100}%`,
                top: `${(y / imageSize[1]) * 100}%`,
                width: `${(width / imageSize[0]) * 100}%`,
              }}
              className="absolute cursor-pointer rounded-8 border-3 border-white/30"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
