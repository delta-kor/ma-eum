import Icon from '@/components/core/Icon';
import LazyImage from '@/components/core/LazyImage';
import MetaWrapper from '@/components/video/player/meta/MetaWrapper';
import { AlbumService } from '@/services/album.service';
import { MusicService } from '@/services/music.service';
import { ImageUrl } from '@/utils/url.util';
import { MusicVideoMeta } from '@/utils/video.util';
import Link from 'next/link';

interface Props {
  musicMeta: MusicVideoMeta;
}

export default async function MusicMetaCard({ musicMeta }: Props) {
  const musicId = musicMeta.musicId;
  const musicData = MusicService.getOne(musicId);
  const albumData = AlbumService.getOneByMusicId(musicId);

  const [music, album] = await Promise.all([musicData, albumData]);
  if (!music || !album) return null;

  const [gradientFrom, gradientTo] = album.colors;

  return (
    <MetaWrapper topFor="music" alwaysTop>
      <Link
        href={`/play/${music.id}`}
        style={{
          background: `linear-gradient(101deg, ${gradientFrom} 7.15%, ${gradientTo} 96.7%)`,
        }}
        className="flex items-center gap-16 rounded-16 py-12 pl-12 pr-24"
      >
        <LazyImage
          alt={album.title}
          src={ImageUrl.album(album.id)}
          className="size-64 shrink-0 rounded-8 border-3 border-white/40 bg-white/40"
        />
        <div className="flex min-w-0 grow flex-col gap-4">
          <div className="line-clamp-2 text-20 font-700 text-white">{music.shortTitle}</div>
          <div className="text-16 font-500 text-white opacity-70">{album.title}</div>
        </div>
        <Icon type="music" className="w-20 shrink-0 text-white/30" />
      </Link>
    </MetaWrapper>
  );
}
