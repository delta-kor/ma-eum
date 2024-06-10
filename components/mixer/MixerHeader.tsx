import Icon from '@/components/core/Icon';

export default function MixerHeader() {
  return (
    <div className="flex items-center gap-12">
      <Icon type="mix" className="w-32 shrink-0 text-primary-500" />
      <div className="text-32 font-700 text-primary-500">Stage Mixer</div>
    </div>
  );
}
