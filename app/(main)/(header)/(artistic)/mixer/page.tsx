import ScrollInjector from '@/components/core/ScrollInjector';
import MixerMusicSelector from '@/components/mixer/MixerMusicSelector';
import { MusicService } from '@/services/music.service';
import MetaUtil from '@/utils/meta.util';
import { Metadata } from 'next';

export const revalidate = 3600;

export default async function MixerMainPage() {
  const musicsData = MusicService.getMixableMusics();
  const [musics] = await Promise.all([musicsData]);

  return (
    <div className="px-24 pb-24">
      <ScrollInjector />
      <div className="mx-auto mt-artistic-header-height-md w-full max-w-screen-lg lg:mt-artistic-header-height-lg lg:pt-32">
        <MixerMusicSelector musics={musics} />
      </div>
    </div>
  );
}

export function generateMetadata(): Metadata {
  return MetaUtil.getSubpage(
    'Stage Mixer',
    'Mix and watch best performance videos from CSR(첫사랑).',
    '/mixer'
  );
}
