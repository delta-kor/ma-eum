'use client';

import EndItems from '@/components/core/EndItems';
import TalkArticleItem from '@/components/talk/article/TalkArticleItem';
import { trpc } from '@/hooks/trpc';
import { TalkArticleMetadata } from '@/services/talk.service';
import { PaginationResult } from '@/utils/pagination.util';
import { DateTime } from 'luxon';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface Props {
  preloadedArticlesMetadata: PaginationResult<TalkArticleMetadata>;
  userId: null | string;
}

export default function TalkArticleList({ preloadedArticlesMetadata, userId }: Props) {
  const { inView, ref } = useInView({
    threshold: 0,
  });

  const articles = trpc.talk.getArticlesMetadata.useInfiniteQuery(
    {},
    {
      getNextPageParam: lastPage => lastPage.nextCursor || undefined,
      initialData: { pageParams: [null], pages: [preloadedArticlesMetadata] },
      refetchOnMount: false,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    }
  );

  useEffect(() => {
    if (inView && articles.hasNextPage && !articles.isFetching) {
      void articles.fetchNextPage();
    }
  }, [inView]);

  const items = articles.data?.pages.map(page => page.items).flat() || [];
  const today = DateTime.local({ zone: 'Asia/Seoul' }).toJSDate();

  return (
    <div className="flex flex-col gap-20">
      {items.map(articleMetadata => (
        <div key={articleMetadata.id} className="flex flex-col gap-20">
          <TalkArticleItem articleMetadata={articleMetadata} today={today} userId={userId} />
          <div className="h-2 bg-gray-50" />
        </div>
      ))}
      {articles.hasNextPage ? (
        <div ref={ref} className="col-span-full h-8" />
      ) : (
        <div className="col-span-full">
          <EndItems />
        </div>
      )}
    </div>
  );
}
