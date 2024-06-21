'use client';

import Icon from '@/components/core/Icon';
import useHistory from '@/hooks/history';

export default function VideoBack() {
  const history = useHistory();

  function handleClick() {
    history.back();
  }

  return (
    <div
      onClick={handleClick}
      className="-mx-12 flex cursor-pointer items-center self-stretch px-12 lg:hidden"
    >
      <Icon type="left" className="w-16 text-gray-200" />
    </div>
  );
}
