import MixerHeader from '@/components/mixer/MixerHeader';
import MixerMusicItem from '@/components/mixer/MixerMusicItem';
import { MusicService } from '@/services/music.service';

export const revalidate = 0;

export default async function MixerMainPage() {
  const musicsData = MusicService.getMixableMusics();
  const [musics] = await Promise.all([musicsData]);

  return (
    <div className="flex h-dvh w-full flex-col items-center justify-between px-24 py-64">
      <MixerHeader />
      <div className="flex flex-col gap-12 self-stretch">
        {musics.map(music => (
          <MixerMusicItem key={music.id} music={music} />
        ))}
      </div>
    </div>
  );
}
