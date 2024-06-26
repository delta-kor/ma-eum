import Icon from '@/components/core/Icon';
import { TalkArticleMetadata } from '@/services/talk.service';
import { getShortPastRelativeTime } from '@/utils/time.util';
import { TalkUser } from '@prisma/client';
import Link from 'next/link';

interface Props {
  articleMetadata: TalkArticleMetadata;
  today: Date;
  user: TalkUser | null;
}

export default function TalkArticleItem({ articleMetadata, today, user }: Props) {
  return (
    <Link href={`/talk/article/${articleMetadata.id}`} className="flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <div className="text-14 font-500 text-gray-500">{articleMetadata.nickname}</div>
        <div className="flex flex-col gap-8">
          <div className="text-20 font-700 text-black">{articleMetadata.title}</div>
          <div className="line-clamp-2 whitespace-pre-line text-16 font-500 text-gray-500">
            {articleMetadata.content}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-16">
        <div className="flex items-center gap-8">
          <Icon
            data-active={user && articleMetadata.likedUsersId.includes(user.id)}
            type="heart"
            className="w-16 shrink-0 text-gray-200 data-[active=true]:text-c-red"
          />
          <div className="text-16 font-500 text-gray-500">
            {articleMetadata.likedUsersId.length}
          </div>
        </div>
        <div className="flex items-center gap-8">
          <Icon
            data-active={user && articleMetadata.commentUsersId.includes(user.id)}
            type="comment"
            className="w-16 shrink-0 text-gray-200 data-[active=true]:text-primary-500"
          />
          <div className="text-16 font-500 text-gray-500">
            {articleMetadata.commentUsersId.length}
          </div>
        </div>
        <div className="-mx-4 size-4 rounded-full bg-gray-200" />
        <div className="text-16 font-500 text-gray-500">
          {getShortPastRelativeTime(articleMetadata.date, today)}
        </div>
      </div>
    </Link>
  );
}
