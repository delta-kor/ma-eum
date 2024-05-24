import AlbumCardList from '@/components/card/AlbumCardList';
import IconMenu from '@/components/menu/IconMenu';

export const revalidate = 0;

export default function VideosPage() {
  return (
    <div className="flex flex-col gap-32 pt-18">
      <IconMenu />
      <AlbumCardList />
    </div>
  );
}
