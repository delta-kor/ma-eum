import Icon from '@/components/core/Icon';
import { Music } from '@prisma/client';
import Link from 'next/link';

interface Props {
  music: Music;
}

export default function MixerEnterButton({ music }: Props) {
  return (
    <Link
      href={`/mixer/${music.id}`}
      className="jelly jelly-reduced flex cursor-pointer items-center justify-center gap-12 rounded-16 bg-gradient-primary p-16 shadow-primary hover:scale-105"
    >
      <Icon type="mix" className="w-20 text-white" />
      <div className="text-20 font-700 text-white">Stage Mixer</div>
    </Link>
  );
}
