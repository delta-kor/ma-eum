import Icon from '@/components/core/Icon';
import { TalkArticleMetadata } from '@/services/talk.service';
import { getShortPastRelativeTime } from '@/utils/time.util';
import Link from 'next/link';

interface Props {
  articleMetadata: TalkArticleMetadata;
  today: Date;
  userId: null | string;
}

export default function TalkArticleItem({ articleMetadata, today, userId }: Props) {
  return (
    <Link
      href={`/talk/article/${articleMetadata.id}`}
      className="flex flex-col gap-12 lg:flex-row lg:items-center"
    >
      <div className="flex flex-col gap-4 lg:grow">
        <div className="truncate text-14 font-500 text-gray-500">{articleMetadata.nickname}</div>
        <div className="flex flex-col gap-4">
          <div className="truncate text-20 font-700 text-black">{articleMetadata.title}</div>
          <div className="line-clamp-2 whitespace-pre-line text-16 font-400 text-gray-500">
            {articleMetadata.content}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-16 lg:flex-col lg:items-end lg:gap-8">
        <div className="flex items-center gap-16">
          <div className="flex items-center gap-8">
            <Icon
              data-active={userId && articleMetadata.likedUsersId.includes(userId)}
              type="heart"
              className="w-16 shrink-0 text-gray-200 data-[active=true]:text-c-red"
            />
            <div className="text-16 font-500 text-gray-500">
              {articleMetadata.likedUsersId.length}
            </div>
          </div>
          <div className="flex items-center gap-8">
            <Icon
              data-active={userId && articleMetadata.commentUsersId.includes(userId)}
              type="comment"
              className="w-16 shrink-0 text-gray-200 data-[active=true]:text-primary-500"
            />
            <div className="text-16 font-500 text-gray-500">
              {articleMetadata.commentUsersId.length}
            </div>
          </div>
        </div>
        <div className="-mx-4 size-4 rounded-full bg-gray-200 lg:hidden" />
        <div className="text-16 font-500 text-gray-500">
          {getShortPastRelativeTime(articleMetadata.date, today)}
        </div>
      </div>
    </Link>
  );
}

export function TalkArticleItemPlaceholder() {
  return (
    <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
      <div className="flex flex-col gap-4 lg:grow">
        <div className="h-[17px] w-[128px] rounded-4 bg-gray-100" />
        <div className="flex flex-col gap-4">
          <div className="h-24 w-4/5 rounded-4 bg-gray-100" />
          <div className="flex flex-col gap-2">
            <div className="h-[19px] w-3/5 rounded-4 bg-gray-50" />
            <div className="h-[19px] w-2/5 rounded-4 bg-gray-50" />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-16 lg:flex-col lg:items-end lg:gap-8">
        <div className="flex items-center gap-16">
          <div className="flex items-center gap-8">
            <Icon type="heart" className="w-16 shrink-0 text-gray-200" />
            <div className="h-[19px] w-32 rounded-4 bg-gray-100" />
          </div>
          <div className="flex items-center gap-8">
            <Icon type="comment" className="w-16 shrink-0 text-gray-200" />
            <div className="h-[19px] w-32 rounded-4 bg-gray-100" />
          </div>
        </div>
        <div className="-mx-4 size-4 rounded-full bg-gray-200 lg:hidden" />
        <div className="h-[19px] w-64 rounded-4 bg-gray-100" />
      </div>
    </div>
  );
}
