'use client';

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
    <div>
      <MixerVideo />
      <MixerTitle music={music} />
      <MixerSelector sessions={sessions} />
    </div>
  );
}
