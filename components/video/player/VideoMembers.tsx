import LazyImage from '@/components/core/LazyImage';
import Translate from '@/components/core/Translate';
import { getMemberName } from '@/utils/member.util';
import { ImageUrl } from '@/utils/url.util';
import { MembersVideoMeta } from '@/utils/video.util';

interface Props {
  membersMeta: MembersVideoMeta;
}

export default function VideoMembers({ membersMeta }: Props) {
  const members = membersMeta.members;

  return (
    <div className="flex items-center gap-8">
      {members.map(member => (
        <div
          key={member}
          className="flex items-center gap-8 rounded-full bg-gray-100 py-6 pl-6 pr-14"
        >
          <LazyImage src={ImageUrl.member(member)} className="size-28 rounded-full bg-gray-200" />
          <div className="text-14 font-700 text-black">
            <Translate>{getMemberName(member)}</Translate>
          </div>
        </div>
      ))}
    </div>
  );
}
