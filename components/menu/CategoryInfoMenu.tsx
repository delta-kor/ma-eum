'use client';

import Icon from '@/components/core/Icon';
import useHistory from '@/hooks/history';

interface Props {
  categoryTitle: string;
  displayMembers?: boolean;
  videosCount: number;
}

export default function CategoryInfoMenu({ categoryTitle, displayMembers, videosCount }: Props) {
  const history = useHistory();

  function handleClick() {
    history.back();
  }

  return (
    <div
      data-members={displayMembers}
      className="flex items-center gap-details-header-height rounded-16 bg-gray-50 py-16 data-[members=true]:grid data-[members=true]:grid-cols-[160px_1fr] data-[members=true]:gap-16"
    >
      <div
        onClick={handleClick}
        className="flex cursor-pointer items-center gap-12 self-stretch px-24"
      >
        <Icon type="left" className="w-16 text-gray-200" />
        <div className="text-18 font-500 text-gray-500">Back</div>
      </div>
      <div className="flex grow flex-col gap-4">
        <div className="text-24 font-700">{categoryTitle}</div>
        <div className="text-16 font-400 text-gray-500">
          {videosCount} Video{videosCount > 1 && 's'}
        </div>
      </div>
    </div>
  );
}
