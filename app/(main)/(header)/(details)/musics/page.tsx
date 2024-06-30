import MusicCardList from '@/components/card/MusicCardList';
import DetailsContent from '@/components/core/header/DetailsContent';
import MetaUtil from '@/utils/meta.util';
import { Metadata } from 'next';

export const revalidate = 3600;

export default function MusicsPage() {
  return (
    <DetailsContent>
      <div className="px-24">
        <div className="pb-24 lg:mx-auto lg:max-w-screen-lg">
          <MusicCardList />
        </div>
      </div>
    </DetailsContent>
  );
}

export function generateMetadata(): Metadata {
  return MetaUtil.getSubpage(
    'Musics',
    'Explore and enjoy the latest tracks from CSR(첫사랑).',
    '/musics'
  );
}
