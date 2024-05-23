import GradientIcon from '@/components/core/GradientIcon';

export type IconMenuItemType = 'challenge' | 'cover' | 'live' | 'shorts';

interface Props {
  type: IconMenuItemType;
}

export default function IconMenuItem({ type }: Props) {
  let text: string;

  switch (type) {
    case 'challenge':
      text = '챌린지';
      break;
    case 'cover':
      text = '커버';
      break;
    case 'live':
      text = '라이브';
      break;
    case 'shorts':
      text = 'Shorts';
      break;
    default:
      throw new Error('Invalid IconMenuItem type');
  }

  return (
    <div className="flex shrink-0 grow cursor-pointer flex-col items-center gap-8">
      <GradientIcon type={type} className="w-32" />
      <div className="text-center text-18 font-500 text-black">{text}</div>
    </div>
  );
}
