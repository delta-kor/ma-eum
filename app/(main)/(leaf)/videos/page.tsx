import AlbumCardList from '@/components/card/AlbumCardList';
import ImageCardList from '@/components/card/ImageCardList';
import LineCardList from '@/components/card/LineCardList';
import ProgramCardList from '@/components/card/ProgramCardList';
import DetailsContent from '@/components/core/header/DetailsContent';
import IconMenu from '@/components/menu/IconMenu';

export const revalidate = 0;

export default function VideosPage() {
  return (
    <DetailsContent>
      <div className="flex flex-col gap-32 px-24 pb-24 pt-18 lg:mx-auto lg:max-w-screen-lg">
        <div className="flex flex-col gap-32">
          <IconMenu />
          <div className="flex flex-col gap-12">
            <AlbumCardList />
            <ProgramCardList />
          </div>
        </div>
        <div className="flex flex-col gap-32 lg:grid lg:grid-cols-2">
          <ImageCardList />
          <LineCardList />
        </div>
      </div>
    </DetailsContent>
  );
}
