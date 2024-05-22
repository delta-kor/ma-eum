import GradientIcon from '@/components/core/GradientIcon';

export type StrongMenuItemType = 'musics' | 'photocards' | 'videos';

interface Props {
  type: StrongMenuItemType;
}

export default function StrongMenuItem({ type }: Props) {
  let text: string, gradient: string;

  switch (type) {
    case 'musics':
      text = 'Musics';
      gradient = 'conic-gradient(from 71deg at 0% 67.03%, #41E582 0deg, #25CE68 360deg)';
      break;
    case 'photocards':
      text = 'Photo\ncards';
      gradient = 'conic-gradient(from 71deg at 0% 67.03%, #967CFF 0deg, #6E4EED 360deg)';
      break;
    case 'videos':
      text = 'Videos';
      gradient = 'conic-gradient(from 71deg at 0% 67.03%, #FCBA6B 0deg, #F9A037 360deg)';
      break;
    default:
      throw new Error('Invalid StrongMenuItem type');
  }

  return (
    <div
      style={{ background: gradient }}
      className="relative h-[112px] w-[118px] shrink-0 cursor-pointer rounded-16 border-3 border-white/70"
    >
      <div className="absolute left-16 top-16 whitespace-pre text-20 font-700 leading-[100%] text-white">
        {text}
      </div>
      <GradientIcon type={type} className="absolute bottom-16 right-16 w-32" />
    </div>
  );
}
