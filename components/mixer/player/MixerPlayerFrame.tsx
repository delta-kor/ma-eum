'use client';

import MixerPlayerCloseIcon from '@/components/mixer/player/MixerPlayerCloseIcon';
import MixerSelector from '@/components/mixer/player/MixerSelector';
import MixerTitle from '@/components/mixer/player/MixerTitle';
import MixerVideo from '@/components/mixer/player/MixerVideo';
import { ExtendedMusic } from '@/services/music.service';
import { ExtendedSession } from '@/services/session.service';

interface Props {
  music: ExtendedMusic;
  sessions: ExtendedSession[];
}

export default function MixerPlayerFrame({ music, sessions }: Props) {
  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[1fr_360px]">
      <div className="sticky left-0 top-0 z-10 aspect-video self-stretch lg:static lg:aspect-auto">
        <MixerVideo />
      </div>
      <div className="flex flex-col gap-12 p-12">
        <div className="flex gap-12">
          <MixerTitle music={music} />
          <MixerPlayerCloseIcon />
        </div>
        <MixerSelector sessions={sessions} />
      </div>
    </div>
  );
}
