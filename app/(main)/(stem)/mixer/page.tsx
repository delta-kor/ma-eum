import MixerMusicSelector from '@/components/mixer/MixerMusicSelector';
import { MusicService } from '@/services/music.service';

export const revalidate = 0;

export default async function MixerMainPage() {
  const musicsData = MusicService.getMixableMusics();
  const [musics] = await Promise.all([musicsData]);

  return (
    <div className="mx-auto mt-artistic-header-height-md w-full max-w-screen-md lg:mt-artistic-header-height-lg">
      <MixerMusicSelector musics={musics} />
    </div>
  );
}
