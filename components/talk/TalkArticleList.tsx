import TalkArticleItem from '@/components/talk/TalkArticleItem';
import { TalkArticleMetadata } from '@/services/talk.service';
import { PaginationResult } from '@/utils/pagination.util';
import { DateTime } from 'luxon';

interface Props {
  preloadedArticlesMetadata: PaginationResult<TalkArticleMetadata>;
}

export default function TalkArticleList({ preloadedArticlesMetadata }: Props) {
  const items = preloadedArticlesMetadata.items;
  const today = DateTime.local({ zone: 'Asia/Seoul' }).toJSDate();

  return (
    <div className="flex flex-col gap-24">
      {items.map(articleMetadata => (
        <TalkArticleItem key={articleMetadata.id} articleMetadata={articleMetadata} today={today} />
      ))}
    </div>
  );
}
