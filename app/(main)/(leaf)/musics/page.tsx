import MusicCardList from '@/components/card/MusicCardList';
import DetailsContent from '@/components/core/header/DetailsContent';

export const revalidate = 0;

export default function MusicsPage() {
  return (
    <DetailsContent>
      <div className="pb-24">
        <MusicCardList />
      </div>
    </DetailsContent>
  );
}
