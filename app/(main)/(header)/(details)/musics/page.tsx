import MusicCardList from '@/components/card/MusicCardList';
import DetailsContent from '@/components/core/header/DetailsContent';

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
