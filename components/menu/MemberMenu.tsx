import LazyImage from '@/components/core/LazyImage';
import Translate from '@/components/core/Translate';
import useQuery from '@/hooks/query';
import { Member, Members, getMemberName } from '@/utils/member.util';
import { ImageUrl } from '@/utils/url.util';

interface Props {
  selected: Member | null;
  onSelect: (member: Member | null) => void;
}

export default function MemberMenu({ selected, onSelect }: Props) {
  const query = useQuery();

  function handleMemberClick(member: Member | null) {
    onSelect(member);
    query.softSet({ member });
  }

  return (
    <div className="scrollbar-hide -mb-24 flex snap-x scroll-pl-24 overflow-x-scroll px-24 pb-24 lg:sticky lg:top-artistic-header-height-lg lg:grid lg:grid-cols-2 lg:items-center lg:justify-items-center lg:gap-12 lg:self-start lg:px-0">
      {[null, ...Members].map(member => (
        <div
          key={member || 'all'}
          data-active={selected === member}
          onClick={() => handleMemberClick(member)}
          className="group flex w-artistic-header-height-md shrink-0 cursor-pointer snap-start flex-col items-center gap-6 rounded-8 py-10 data-[active=true]:bg-gradient-primary data-[active=true]:shadow-primary lg:w-full"
        >
          <LazyImage
            src={ImageUrl.member(member)}
            className="size-48 rounded-full border-2 border-transparent bg-gray-100 group-data-[active=true]:border-white"
          />
          <div className="text-center text-14 font-500 text-black group-data-[active=true]:text-white">
            <Translate>{getMemberName(member)}</Translate>
          </div>
        </div>
      ))}
    </div>
  );
}
