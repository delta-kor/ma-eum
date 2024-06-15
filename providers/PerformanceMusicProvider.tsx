'use client';

import useQuery from '@/hooks/query';
import { Music } from '@prisma/client';
import { ReactNode, createContext } from 'react';

export const PerformanceMusicContext = createContext<Music | null>(null);

interface Props {
  musics: Music[];
  children: ReactNode;
}

export default function PerformanceMusicProvider({ musics, children }: Props) {
  const query = useQuery();
  const musicQueryValue = query.get('music');

  const selectedMusic =
    musics.find(music => music.id === musicQueryValue) ||
    musics.find(music => music.isTitle) ||
    musics[0];

  return (
    <PerformanceMusicContext.Provider value={selectedMusic}>
      {children}
    </PerformanceMusicContext.Provider>
  );
}
