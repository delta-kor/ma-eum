import GradientIcon from '@/components/core/GradientIcon';
import Translate from '@/components/core/Translate';

export type IconMenuItemType = 'challenge' | 'cover' | 'live' | 'shorts';

interface Props {
  type: IconMenuItemType;
}

export default function IconMenuItem({ type }: Props) {
  let text: string;

  switch (type) {
    case 'challenge':
      text = '$challenge';
      break;
    case 'cover':
      text = '$cover';
      break;
    case 'live':
      text = '$live';
      break;
    case 'shorts':
      text = '$shorts';
      break;
    default:
      throw new Error('Invalid IconMenuItem type');
  }

  return (
    <div className="flex shrink-0 grow basis-0 cursor-pointer flex-col items-center gap-8">
      <GradientIcon type={type} className="w-32" />
      <div className="text-center text-18 font-500 text-black">
        <Translate>{text}</Translate>
      </div>
    </div>
  );
}
