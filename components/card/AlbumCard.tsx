import LazyImage from '@/components/core/LazyImage';
import MotionWrapper from '@/components/core/MotionWrapper';
import Translate from '@/components/core/Translate';
import { ImageUrl } from '@/utils/url.util';
import { Album } from '@prisma/client';
import { format } from 'date-fns';
import Link from 'next/link';

interface Props {
  album: Album;
  menu?: boolean;
}

export default function AlbumCard({ album, menu }: Props) {
  const [gradientFrom, gradientTo] = album.colors;

  return (
    <MotionWrapper
      layoutId={`album-card-wrapper-${album.id}`}
      style={{ background: `linear-gradient(101deg, ${gradientFrom} 7.15%, ${gradientTo} 96.7%)` }}
      size
      className="flex flex-col gap-12 rounded-16 p-12"
    >
      <div className="flex items-center gap-12">
        <MotionWrapper layoutId={`album-card-image-${album.id}`} size>
          <LazyImage
            alt={album.title}
            src={ImageUrl.album(album.id)}
            className="size-64 rounded-8 border-3 border-white/40 bg-white/40"
          />
        </MotionWrapper>
        <div className="flex flex-col gap-4">
          <MotionWrapper
            layoutId={`album-card-title-${album.id}`}
            className="text-20 font-700 text-white"
          >
            {album.title}
          </MotionWrapper>
          <MotionWrapper
            layoutId={`album-card-description-${album.id}`}
            className="text-16 font-500 text-white/70"
          >
            {format(album.release, 'yy. MM. dd.')}
          </MotionWrapper>
        </div>
      </div>
      {menu && (
        <MotionWrapper
          layoutId={`album-card-menu-${album.id}`}
          className="relative -mx-8 flex h-32 items-stretch"
        >
          {!album.isMini && (
            <>
              <Link
                href={`/videos/albums/${album.id}/performance`}
                className="flex grow basis-0 cursor-pointer items-center justify-center text-center text-16 font-500 text-white"
              >
                <Translate>$performance</Translate>
              </Link>
              <div className="absolute left-1/2 h-full w-2 -translate-x-1/2 bg-white opacity-30" />
            </>
          )}
          <Link
            href={`/videos/albums/${album.id}/promotion`}
            className="flex grow basis-0 cursor-pointer items-center justify-center text-center text-16 font-500 text-white"
          >
            <Translate>$promotion</Translate>
          </Link>
        </MotionWrapper>
      )}
    </MotionWrapper>
  );
}
