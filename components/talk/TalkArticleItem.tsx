import Icon from '@/components/core/Icon';
import { TalkArticleMetadata } from '@/services/talk.service';
import { getShortPastRelativeTime } from '@/utils/time.util';

interface Props {
  articleMetadata: TalkArticleMetadata;
  today: Date;
}

export default function TalkArticleItem({ articleMetadata, today }: Props) {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <div className="text-14 font-500 text-gray-500">{articleMetadata.nickname}</div>
        <div className="flex flex-col gap-8">
          <div className="text-20 font-700 text-black">{articleMetadata.title}</div>
          <div className="text-16 font-500 text-gray-500">{articleMetadata.title}</div>
        </div>
      </div>
      <div className="flex items-center gap-16">
        <div className="flex items-center gap-8">
          <Icon type="heart" className="w-16 shrink-0 text-gray-200" />
          <div className="text-16 font-500 text-gray-500">3</div>
        </div>
        <div className="flex items-center gap-8">
          <Icon type="comment" className="w-16 shrink-0 text-gray-200" />
          <div className="text-16 font-500 text-gray-500">2</div>
        </div>
        <div className="-mx-4 size-4 rounded-full bg-gray-200" />
        <div className="text-16 font-500 text-gray-500">
          {getShortPastRelativeTime(articleMetadata.date, today)}
        </div>
      </div>
    </div>
  );
}
