import Icon from '@/components/core/Icon';
import { Music } from '@prisma/client';

interface Props {
  music: Music;
}

export default function MixerEnterButton({ music }: Props) {
  return (
    <div className="flex cursor-pointer items-center justify-center gap-12 rounded-16 bg-gradient-primary p-16 shadow-primary">
      <Icon type="mix" className="w-20 text-white" />
      <div className="text-20 font-700 text-white">Stage Mixer</div>
    </div>
  );
}
