'use client';

import MixerVideo from '@/components/mixer/player/MixerVideo';
import useMixerControl from '@/hooks/mixer-control';

export default function MixerPlayerFrame() {
  const mixerControl = useMixerControl();

  return (
    <div>
      <MixerVideo />
    </div>
  );
}
