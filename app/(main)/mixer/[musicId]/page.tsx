import MixerPlayerFrame from '@/components/mixer/player/MixerPlayerFrame';
import MixerControlProvider from '@/providers/MixerControlProvider';
import { MusicService } from '@/services/music.service';
import { SessionService } from '@/services/session.service';
import MetaUtil from '@/utils/meta.util';
import { notFound } from 'next/navigation';

export const revalidate = 0;

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
  if (process.env.GENERATE_STATIC_PAGES !== '1') return [];

  const musics = await MusicService.getMixableMusics();
  return musics.map(music => ({ musicId: music.id }));
}

export async function generateMetadata({ params: { musicId } }: Props) {
  const music = await MusicService.getOne(musicId);
  if (!music) return notFound();

  const title = `${music.shortTitle} - Stage Mixer`;
  return MetaUtil.getSubpage(
    title,
    'Mix and watch best performance videos from CSR(첫사랑).',
    `/mixer/${musicId}`
  );
}
