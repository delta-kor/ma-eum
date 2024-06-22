import LazyImage from '@/components/core/LazyImage';
import MotionWrapper from '@/components/core/MotionWrapper';
import Translate from '@/components/core/Translate';
import { ImageUrl } from '@/utils/url.util';
import { Album } from '@prisma/client';
import Link from 'next/link';

interface Props {
  album: Album;
  horizontal?: boolean;
}

export default function AlbumCardLarge({ album, horizontal }: Props) {
  const [gradientFrom, gradientTo] = album.colors;

  return (
    <MotionWrapper
      data-horizontal={!!horizontal}
      layoutId="album-card-wrapper"
      style={{ background: `linear-gradient(101deg, ${gradientFrom} 7.15%, ${gradientTo} 96.7%)` }}
      size
      className="group flex flex-col gap-16 rounded-16 p-16 data-[horizontal=false]:lg:sticky data-[horizontal=false]:lg:top-artistic-header-height-lg"
    >
      <div className="flex flex-col items-center gap-12 group-data-[horizontal=true]:flex-row">
        <MotionWrapper layoutId="album-card-image" size>
          <LazyImage
            alt={album.title}
            src={ImageUrl.album(album.id)}
            className="size-[176px] shrink-0 rounded-8 border-3 border-white/40 bg-white/40 group-data-[horizontal=true]:size-[78px]"
          />
        </MotionWrapper>
        <div className="flex flex-col items-center gap-6 group-data-[horizontal=true]:items-stretch">
          <MotionWrapper
            layoutId="album-card-title"
            className="text-24 font-700 text-white group-data-[horizontal=true]:text-20"
          >
            {album.title}
          </MotionWrapper>
          <MotionWrapper
            layoutId="album-card-description"
            className="text-20 font-500 text-white/70 group-data-[horizontal=true]:text-16"
          >
            {album.description}
          </MotionWrapper>
        </div>
      </div>
      <MotionWrapper
        layoutId="album-card-menu"
        size
        className="relative -mx-8 flex h-32 items-stretch"
      >
        {!album.isMini && (
          <>
            <Link
              href={`/videos/albums/${album.id}/performance`}
              className="flex grow basis-0 cursor-pointer items-center justify-center text-center text-16 font-500 text-white/40 group-data-[horizontal=true]:font-700 group-data-[horizontal=true]:text-white"
            >
              <Translate>$performance</Translate>
            </Link>
            <div className="absolute left-1/2 h-full w-2 -translate-x-1/2 bg-white opacity-30" />
          </>
        )}
        <Link
          href={`/videos/albums/${album.id}/promotion`}
          className="flex grow basis-0 cursor-pointer items-center justify-center text-center text-16 font-500 text-white/40 group-data-[horizontal=false]:font-700 group-data-[horizontal=false]:text-white"
        >
          <Translate>$promotion</Translate>
        </Link>
      </MotionWrapper>
    </MotionWrapper>
  );
}
