import IconMenuItem from '@/components/menu/IconMenuItem';

export default function IconMenu() {
  return (
    <div className="flex items-center justify-stretch gap-8 px-24">
      <IconMenuItem type="cover" />
      <IconMenuItem type="challenge" />
      <IconMenuItem type="live" />
      <IconMenuItem type="shorts" />
    </div>
  );
}
