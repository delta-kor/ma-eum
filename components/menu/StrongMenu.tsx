import StrongMenuItem from '@/components/menu/StrongMenuItem';

export default function StrongMenu() {
  return (
    <div className="flex items-center gap-16">
      <StrongMenuItem type="videos" />
      <StrongMenuItem type="musics" />
      <StrongMenuItem type="mixer" />
    </div>
  );
}
