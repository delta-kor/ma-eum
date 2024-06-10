import MixerSelectorPageMenu from '@/components/mixer/player/MixerSelectorPageMenu';
import MixerSelectorSessionMenu from '@/components/mixer/player/MixerSelectorSessionMenu';
import useMixerControl from '@/hooks/mixer-control';
import { ExtendedSession } from '@/services/session.service';
import { useState } from 'react';

interface Props {
  sessions: ExtendedSession[];
}

export default function MixerSelector({ sessions }: Props) {
  const mixerControl = useMixerControl();
  const initialSession =
    sessions.find(session => session.videos.some(video => video.id === mixerControl.video.id)) ||
    sessions[0];

  const [activeSession, setActiveSession] = useState<ExtendedSession>(initialSession);

  function handlePageChange(direction: number) {
    const index = sessions.indexOf(activeSession);
    const nextIndex = (index + direction + sessions.length) % sessions.length;
    setActiveSession(sessions[nextIndex]);
  }

  return (
    <div className="flex flex-col gap-24 rounded-8 bg-gray-50 px-20 py-16">
      <MixerSelectorPageMenu session={activeSession} onChange={handlePageChange} />
      <MixerSelectorSessionMenu session={activeSession} />
    </div>
  );
}
