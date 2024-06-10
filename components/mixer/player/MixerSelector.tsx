import MixerSelectorPageMenu from '@/components/mixer/player/MixerSelectorPageMenu';
import MixerSelectorSessionMenu from '@/components/mixer/player/MixerSelectorSessionMenu';
import { ExtendedSession } from '@/services/session.service';
import { useState } from 'react';

interface Props {
  sessions: ExtendedSession[];
}

export default function MixerSelector({ sessions }: Props) {
  const [activeSession, setActiveSession] = useState<ExtendedSession>(sessions[0]);

  function handlePageChange(direction: number) {
    const index = sessions.indexOf(activeSession);
    const nextIndex = (index + direction + sessions.length) % sessions.length;
    setActiveSession(sessions[nextIndex]);
  }

  return (
    <div className="flex flex-col gap-24 p-24">
      <MixerSelectorPageMenu session={activeSession} onChange={handlePageChange} />
      <MixerSelectorSessionMenu session={activeSession} />
    </div>
  );
}
