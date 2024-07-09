'use client';

import TalkArticleItem, {
  TalkArticleItemPlaceholder,
} from '@/components/talk/article/TalkArticleItem';
import { trpc } from '@/hooks/trpc';
import { DateTime } from 'luxon';

interface Props {
  userId: null | string;
}

export default function TalkArticleList({ userId }: Props) {
  const articles = trpc.talk.getArticlesMetadata.useQuery(
    {},
    {
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    }
  );

  const items = articles.data?.items || [];
  const isLoading = articles.isLoading;

  const today = DateTime.local({ zone: 'Asia/Seoul' }).toJSDate();

  const placeholder = Array.from({ length: 10 }).map((_, index) => (
    <div key={index} className="flex flex-col gap-20">
      <TalkArticleItemPlaceholder />
      <div className="h-2 bg-gray-50" />
    </div>
  ));

  return (
    <div className="flex flex-col gap-20">
      {isLoading
        ? placeholder
        : items.map(articleMetadata => (
            <div key={articleMetadata.id} className="flex flex-col gap-20">
              <TalkArticleItem articleMetadata={articleMetadata} today={today} userId={userId} />
              <div className="h-2 bg-gray-50" />
            </div>
          ))}
    </div>
  );
}

export function TalkArticleListPlaceholder() {
  return (
    <div className="flex flex-col gap-20">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="flex flex-col gap-20">
          <TalkArticleItemPlaceholder />
          <div className="h-2 bg-gray-50" />
        </div>
      ))}
    </div>
  );
}
