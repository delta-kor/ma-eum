'use client';

import GradientIcon from '@/components/core/GradientIcon';
import Icon from '@/components/core/Icon';
import Translate from '@/components/core/Translate';
import useHistory from '@/hooks/history';

interface Props {
  type: 'challenge' | 'cover' | 'live' | 'shorts';
}

export default function VideoListInfoMenu({ type }: Props) {
  const history = useHistory();

  function handleClick() {
    history.back();
  }

  let content: string;
  switch (type) {
    case 'challenge':
      content = '$challenge';
      break;
    case 'cover':
      content = '$cover';
      break;
    case 'live':
      content = '$live';
      break;
    case 'shorts':
      content = '$shorts';
      break;
  }

  return (
    <div className="relative flex items-center justify-center rounded-16 bg-gray-50 py-16">
      <div
        onClick={handleClick}
        className="absolute left-0 top-1/2 flex -translate-y-1/2 cursor-pointer items-center gap-12 self-stretch px-24"
      >
        <Icon type="left" className="w-16 text-gray-200" />
        <div className="text-18 font-500 text-gray-500">Back</div>
      </div>
      <div className="flex items-center gap-16">
        <GradientIcon type={type} className="w-24" />
        <div className="text-24 font-700">
          <Translate>{content}</Translate>
        </div>
      </div>
    </div>
  );
}
