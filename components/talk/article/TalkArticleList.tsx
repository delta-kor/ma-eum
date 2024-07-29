'use client';

import TalkArticleItem, {
  TalkArticleItemPlaceholder,
} from '@/components/talk/article/TalkArticleItem';
import TalkArticlePagination from '@/components/talk/article/TalkArticlePagination';
import useQuery from '@/hooks/query';
import { trpc } from '@/hooks/trpc';
import { TalkArticleMetadata } from '@/services/talk.service';
import { IndexPaginationResult } from '@/utils/pagination.util';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';

interface Props {
  preloadedArticles: IndexPaginationResult<TalkArticleMetadata>;
  userId: null | string;
}

export default function TalkArticleList({ preloadedArticles, userId }: Props) {
  const query = useQuery();
  const [isInitial, setIsInitial] = useState(true);

  const page = parseInt(query.get('page') || '1');
  const sort = query.get('sort') === 'like' ? 'like' : 'newest';

  const articles = trpc.talk.getArticlesMetadata.useQuery(
    { cursor: page - 1, sort },
    {
      placeholderData: preloadedArticles,
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    }
  );

  useEffect(() => {
    if (articles.isFetchedAfterMount && !articles.isFetching) setIsInitial(false);
  }, [articles.isFetchedAfterMount, articles.isFetching]);

  const items = articles.data?.items || [];
  const totalPages = articles.data?.pages || 1;
  const isLoading = !isInitial && articles.isFetching;

  const today = DateTime.local({ zone: 'Asia/Seoul' }).toJSDate();

  const placeholder = Array.from({ length: 10 }).map((_, index) => (
    <div key={index} className="flex flex-col gap-20">
      <TalkArticleItemPlaceholder />
      <div className="h-2 bg-gray-50" />
    </div>
  ));

  return (
    <div className="flex flex-col gap-32">
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
      <TalkArticlePagination currentPage={page} totalPages={totalPages} />
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
