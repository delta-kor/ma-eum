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
      className="jelly jelly-increased -mx-12 flex size-40 cursor-pointer items-center rounded-8 px-12 hover:bg-gray-50 selected:bg-gray-50 lg:hidden"
    >
      <Icon type="left" className="w-16 text-gray-200" />
    </div>
  );
}
