import Icon from '@/components/core/Icon';
import useAbout from '@/hooks/about';
import AboutUtil from '@/utils/about.util';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const MotionImage = motion(Image);

export default function AboutDiscographyPage() {
  const { index, page, setPage } = useAbout();
  const [albumIndex, setAlbumIndex] = useState(index);
  const [pageState, setPageState] = useState(0);

  const albumsCount = AboutUtil.getAlbumsCount();
  const albumInfo = AboutUtil.getAlbumInfo(albumIndex);

  useEffect(() => {
    if (page === 'discography' && albumIndex !== index) {
      setAlbumIndex(index);
    }
  }, [index]);

  useEffect(() => {
    setPageState(0);
    setTimeout(() => {
      setPageState(1);
    }, 800);
  }, [albumIndex]);

  function handleLeft() {
    setPage('discography', (albumIndex - 1 + albumsCount) % albumsCount);
  }

  function handleRight() {
    setPage('discography', (albumIndex + 1) % albumsCount);
  }

  function handleHandleClick(index: number) {
    setPage('discography', index);
  }

  if (!albumInfo) return null;

  return (
    <motion.div exit={{ opacity: 0 }} className="relative size-full">
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
        data-active={pageState !== 0}
        className="absolute inset-x-24 flex flex-col gap-20 data-[active=false]:top-1/2 data-[active=true]:bottom-24 data-[active=false]:-translate-y-1/2"
      >
        <motion.div
          data-active={pageState !== 0}
          layoutId="discography-album"
          layout
          className="flex items-center gap-16 data-[active=false]:flex-col"
        >
          <MotionImage
            alt={albumInfo.title}
            animate={pageState !== 0 ? 'active' : 'loaded'}
            initial="initial"
            layout="position"
            layoutId="discography-cover"
            src={albumInfo.cover}
            variants={{
              active: { height: 60, opacity: 1, scale: 1, width: 60 },
              initial: { height: 90, opacity: 0, scale: 0, width: 90 },
              loaded: { opacity: 1, scale: 1 },
            }}
            className="size-[90px] rounded-8"
          />
          <div
            data-active={pageState !== 0}
            className="flex flex-col gap-4 data-[active=false]:items-center"
          >
            <motion.div
              animate={pageState !== 0 ? 'active' : 'loaded'}
              initial="initial"
              layout="position"
              layoutId="discography-title"
              variants={{
                active: { fontSize: '20px', opacity: 1, y: 0 },
                initial: { fontSize: '24px', opacity: 0, y: 20 },
                loaded: { opacity: 1, transition: { delay: 0.1 }, y: 0 },
              }}
              className="font-600 text-white"
            >
              {albumInfo.title}
            </motion.div>
            <motion.div
              animate={pageState !== 0 ? 'active' : 'loaded'}
              initial="initial"
              layout="position"
              layoutId="discography-date"
              variants={{
                active: { fontSize: '16px', opacity: 1, y: 0 },
                initial: { fontSize: '20px', opacity: 0, y: 20 },
                loaded: { opacity: 1, transition: { delay: 0.2 }, y: 0 },
              }}
              className="text-16 font-500 text-white/70"
            >
              {albumInfo.date}
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          animate={{ opacity: 1, transition: { delay: 0.8 } }}
          initial={{ opacity: 0 }}
          layoutId="discography-line"
          layout
          className="h-1 self-stretch bg-white/30"
        />
        {pageState === 1 && (
          <div className="flex flex-col gap-24">
            {albumInfo.tracks.map((track, index) => (
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
                <div className="grow text-18 font-500 text-white">{track.title}</div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
