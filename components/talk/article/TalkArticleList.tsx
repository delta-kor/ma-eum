import TalkArticleItem from '@/components/talk/article/TalkArticleItem';
import { TalkArticleMetadata } from '@/services/talk.service';
import { PaginationResult } from '@/utils/pagination.util';
import { TalkUser } from '@prisma/client';
import { DateTime } from 'luxon';

interface Props {
  preloadedArticlesMetadata: PaginationResult<TalkArticleMetadata>;
  user: TalkUser | null;
}

export default function TalkArticleList({ preloadedArticlesMetadata, user }: Props) {
  const items = preloadedArticlesMetadata.items;
  const today = DateTime.local({ zone: 'Asia/Seoul' }).toJSDate();

  return (
    <div className="flex flex-col gap-20">
      {items.map(articleMetadata => (
        <div key={articleMetadata.id} className="flex flex-col gap-20">
          <TalkArticleItem articleMetadata={articleMetadata} today={today} user={user} />
          <div className="h-2 bg-gray-50" />
        </div>
      ))}
    </div>
  );
}
