import StrongMenuItem from '@/components/menu/StrongMenuItem';

export default function StrongMenu() {
  return (
    <div className="flex items-center gap-16 px-24 pb-24">
      <StrongMenuItem type="videos" />
      <StrongMenuItem type="musics" />
      <StrongMenuItem type="photocards" />
    </div>
  );
}
