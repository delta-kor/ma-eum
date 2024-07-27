import GradientIcon from '@/components/core/GradientIcon';
import Link from 'next/link';

export type StrongMenuItemType = 'mixer' | 'musics' | 'videos';

interface Props {
  type: StrongMenuItemType;
}

export default function StrongMenuItem({ type }: Props) {
  let text: string, gradient: string, shadow: string, url: string;

  switch (type) {
    case 'musics':
      text = 'Musics';
      gradient = 'conic-gradient(from 71deg at 0% 67.03%, #41E582 0deg, #25CE68 360deg)';
      shadow = '0px 4px 4px 0px rgba(61, 226, 127, 0.30)';
      url = '/musics';
      break;
    case 'mixer':
      text = 'Stage\nMixer';
      gradient = 'conic-gradient(from 71deg at 0% 67.03%, #967CFF 0deg, #6E4EED 360deg)';
      shadow = '0px 4px 4px 0px rgba(146, 119, 253, 0.30)';
      url = '/mixer';
      break;
    case 'videos':
      text = 'Videos';
      gradient = 'conic-gradient(from 71deg at 0% 67.03%, #FCBA6B 0deg, #F9A037 360deg)';
      shadow = '0px 4px 4px 0px rgba(253, 183, 101, 0.30)';
      url = '/videos';
      break;
    default:
      throw new Error('Invalid StrongMenuItem type');
  }

  return (
    <Link
      href={url}
      style={{ background: gradient, boxShadow: shadow }}
      className="jelly jelly-reduced relative h-[112px] shrink-0 grow cursor-pointer rounded-16 border-3 border-white/70 hover:scale-[1.02]"
    >
      <div className="absolute left-16 right-0 top-16 truncate whitespace-pre text-20 font-700 leading-[100%] text-white">
        {text}
      </div>
      <GradientIcon type={type} className="absolute bottom-16 right-16 w-32" />
    </Link>
  );
}
