import Icon from '@/components/core/Icon';

export default function MixerHeader() {
  return (
    <div className="flex items-center gap-12">
      <Icon type="mix" className="w-32 shrink-0 text-white" />
      <div className="text-32 font-700 text-white">Stage Mixer</div>
    </div>
  );
}
