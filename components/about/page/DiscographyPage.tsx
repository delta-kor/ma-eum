import Icon from '@/components/core/Icon';
import useAbout from '@/hooks/about';
import AboutUtil from '@/utils/about.util';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const MotionImage = motion(Image);

export default function AboutDiscographyPage() {
  const { index, page, setPage } = useAbout();
  const [albumIndex, setAlbumIndex] = useState(index);
  const [isActive, setIsActive] = useState(false);
  const [isInitial, setIsInitial] = useState(true);

  const timeoutRef = useRef<any>(null);

  const albumsCount = AboutUtil.getAlbumsCount();
  const albumInfo = AboutUtil.getAlbumInfo(albumIndex);

  useEffect(() => {
    if (page === 'discography' && albumIndex !== index) {
      setAlbumIndex(index);
    }
  }, [index]);

  useLayoutEffect(() => {
    setIsActive(false);
    setIsInitial(false);
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(
      () => {
        setIsActive(true);
      },
      isInitial ? 800 : 1500
    );
  }, [albumIndex]);

  function handleLeft() {
    setPage('discography', (albumIndex - 1 + albumsCount) % albumsCount);
  }

  function handleRight() {
    setPage('discography', (albumIndex + 1) % albumsCount);
  }

  if (!albumInfo) return null;

  return (
    <motion.div exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="relative size-full">
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        onClick={handleLeft}
        className="jelly jelly-increased absolute left-32 top-1/2 z-10 -m-16 -translate-y-1/2 cursor-pointer rounded-8 p-16 hover:bg-white/10 selected:bg-white/10"
      >
        <Icon type="left" className="w-16 text-white" />
      </motion.div>
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        onClick={handleRight}
        className="jelly jelly-increased absolute right-32 top-1/2 z-10 -m-16 -translate-y-1/2 cursor-pointer rounded-8 p-16 hover:bg-white/10 selected:bg-white/10"
      >
        <Icon type="right" className="w-16 text-white" />
      </motion.div>
      <div
        data-active={isActive}
        className="absolute inset-x-24 flex flex-col gap-20 data-[active=false]:top-1/2 data-[active=true]:bottom-24 data-[active=false]:-translate-y-1/2"
      >
        <motion.div
          data-active={isActive}
          layoutId="discography-album"
          layout
          className="flex items-center gap-16 data-[active=false]:flex-col"
        >
          <motion.div
            animate={isActive ? 'active' : 'loaded'}
            initial="initial"
            layout="position"
            layoutId="discography-cover"
            variants={{
              active: { height: 60, opacity: 1, scale: 1, width: 60 },
              initial: { height: 120, opacity: 0, scale: 0, width: 120 },
              loaded: { opacity: 1, scale: 1 },
            }}
            className="size-[90px] select-none overflow-hidden rounded-8 bg-white/30"
          >
            <Image
              key={index}
              alt={albumInfo.title}
              placeholder="blur"
              src={albumInfo.cover}
              className="size-full"
            />
          </motion.div>
          <div
            data-active={isActive}
            className="flex min-w-0 flex-col gap-4 data-[active=false]:items-center"
          >
            <motion.div
              animate={isActive ? 'active' : 'loaded'}
              initial="initial"
              layout="position"
              layoutId="discography-title"
              variants={{
                active: { fontSize: '20px', opacity: 1, y: 0 },
                initial: { fontSize: '24px', opacity: 0, y: 20 },
                loaded: { opacity: 1, transition: { delay: 0.1 }, y: 0 },
              }}
              className="truncate font-600 text-white"
            >
              {albumInfo.title}
            </motion.div>
            <motion.div
              animate={isActive ? 'active' : 'loaded'}
              initial="initial"
              layout="position"
              layoutId="discography-date"
              variants={{
                active: { fontSize: '16px', opacity: 1, y: 0 },
                initial: { fontSize: '20px', opacity: 0, y: 20 },
                loaded: { opacity: 1, transition: { delay: 0.2 }, y: 0 },
              }}
              className="truncate text-16 font-500 text-white/70"
            >
              {albumInfo.date}
            </motion.div>
          </div>
        </motion.div>
        {isActive && (
          <>
            <motion.div
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              className="h-1 self-stretch bg-white/30"
            />
            <div className="flex flex-col gap-24">
              {albumInfo.tracks.map((track, index, array) => (
                <motion.div
                  key={index}
                  animate={{
                    opacity: 1,
                    transition: { delay: 0.1 * index + 0.2 },
                    y: 0,
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  className="flex items-center gap-16"
                >
                  <div className="min-w-12 text-18 font-400 text-white/30">{index + 1}</div>
                  <div className="grow truncate text-18 font-500 text-white">{track.title}</div>
                  {track.isTitle && (
                    <motion.div
                      animate={{
                        scale: 1,
                        transition: {
                          bounce: 0.5,
                          delay: 0.1 * array.length + 0.4,
                          duration: 0.5,
                          type: 'spring',
                        },
                      }}
                      initial={{ scale: 0 }}
                      className="w-14 shrink-0"
                    >
                      <Icon type="star" className="w-14 text-white/30" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
