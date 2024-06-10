'use client';

import MixerTitle from '@/components/mixer/player/MixerTitle';
import MixerVideo from '@/components/mixer/player/MixerVideo';
import { Music } from '@prisma/client';

interface Props {
  music: Music;
}

export default function MixerPlayerFrame({ music }: Props) {
  return (
    <div>
      <MixerVideo />
      <MixerTitle music={music} />
    </div>
  );
}
