import { Music } from '@prisma/client';
import Link from 'next/link';

interface Props {
  music: Music;
}

export default function MusicCardItem({ music }: Props) {
  return (
    <Link
      href={`/play/${music.id}`}
      replace
      className="flex cursor-pointer items-center gap-16 px-16 py-12"
    >
      <div className="w-10 shrink-0 text-18 font-600 text-primary-500">{music.order}</div>
      <div className="grow text-18 font-500">{music.title}</div>
    </Link>
  );
}
