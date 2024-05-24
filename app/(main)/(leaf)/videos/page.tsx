import AlbumCardList from '@/components/card/AlbumCardList';
import ImageCardList from '@/components/card/ImageCardList';
import LineCardList from '@/components/card/LineCardList';
import ProgramCardList from '@/components/card/ProgramCardList';
import IconMenu from '@/components/menu/IconMenu';

export const revalidate = 0;

export default function VideosPage() {
  return (
    <div className="flex flex-col gap-32 pt-18">
      <IconMenu />
      <div className="flex flex-col gap-12">
        <AlbumCardList />
        <ProgramCardList />
      </div>
      <ImageCardList />
      <LineCardList />
    </div>
  );
}
