'use client';

import LazyImage from '@/components/core/LazyImage';
import { Member, Members, getMemberName } from '@/utils/video';

interface Props {
  selected: Member | null;
  onSelect: (member: Member | null) => void;
}

export default function MemberMenu({ selected, onSelect }: Props) {
  return (
    <div className="scrollbar-hide -mb-24 flex snap-x scroll-pl-24 overflow-x-scroll px-24 pb-24">
      {[null, ...Members].map(member => (
        <div
          key={member || 'all'}
          data-active={selected === member}
          onClick={() => onSelect(member)}
          className="group flex snap-start flex-col items-center gap-6 rounded-8 px-14 py-10 data-[active=true]:bg-gradient-primary data-[active=true]:shadow-primary"
        >
          <LazyImage className="size-[42px] rounded-full bg-gray-100" />
          <div className="max-w-[42px] truncate text-14 font-500 text-black group-data-[active=true]:text-white">
            {getMemberName(member)}
          </div>
        </div>
      ))}
    </div>
  );
}
