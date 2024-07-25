import GradientIcon from '@/components/core/GradientIcon';
import Translate from '@/components/core/Translate';
import Link from 'next/link';

export type IconMenuItemType = 'challenge' | 'cover' | 'live' | 'shorts';

interface Props {
  type: IconMenuItemType;
}

export default function IconMenuItem({ type }: Props) {
  let text: string, link: string;

  switch (type) {
    case 'challenge':
      text = '$challenge';
      link = '/videos/challenge';
      break;
    case 'cover':
      text = '$cover';
      link = '/videos/cover';
      break;
    case 'live':
      text = '$live';
      link = '/videos/live';
      break;
    case 'shorts':
      text = '$shorts';
      link = '/videos/shorts';
      break;
    default:
      throw new Error('Invalid IconMenuItem type');
  }

  return (
    <Link
      href={link}
      className="jelly flex shrink-0 grow basis-0 cursor-pointer flex-col items-center gap-8 hover:scale-105"
    >
      <GradientIcon type={type} className="w-32" />
      <div className="text-center text-18 font-500 text-black">
        <Translate>{text}</Translate>
      </div>
    </Link>
  );
}
