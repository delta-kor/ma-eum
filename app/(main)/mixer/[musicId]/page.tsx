import MixerPlayerFrame from '@/components/mixer/player/MixerPlayerFrame';
import MixerControlProvider from '@/providers/MixerControlProvider';
import { MusicService } from '@/services/music.service';
import { SessionService } from '@/services/session.service';
import { notFound } from 'next/navigation';

export const revalidate = 3600;

interface Props {
  params: {
    musicId: string;
  };
}

export default async function MixerPlayerPage({ params: { musicId } }: Props) {
  const musicData = MusicService.getOneWithPlayData(musicId);
  const sessionsData = SessionService.getSessionsByMusicId(musicId);
  const [music, sessions] = await Promise.all([musicData, sessionsData]);

  if (!music || !music.albumId || !music.playData?.lyrics || sessions.length === 0)
    return notFound();

  return (
    <MixerControlProvider music={music} sessions={sessions}>
      <MixerPlayerFrame music={music} sessions={sessions} />
    </MixerControlProvider>
  );
}

export async function generateStaticParams() {
  const musics = await MusicService.getMixableMusics();
  return musics.map(music => ({ musicId: music.id }));
}
