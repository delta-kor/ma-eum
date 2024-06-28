'use client';

import EndItems from '@/components/core/EndItems';
import TalkArticleItem, {
  TalkArticleItemPlaceholder,
} from '@/components/talk/article/TalkArticleItem';
import { trpc } from '@/hooks/trpc';
import { DateTime } from 'luxon';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface Props {
  userId: null | string;
}

export default function TalkArticleList({ userId }: Props) {
  const { inView, ref } = useInView({
    rootMargin: '200px',
    threshold: 0,
  });

  const articles = trpc.talk.getArticlesMetadata.useInfiniteQuery(
    {},
    {
      getNextPageParam: lastPage => lastPage.nextCursor || undefined,
      refetchOnMount: true,
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
  const isLoading = articles.isFetching && !articles.isFetchingNextPage;

  const today = DateTime.local({ zone: 'Asia/Seoul' }).toJSDate();

  const placeholder = (
    <>
      <div className="flex flex-col gap-20">
        <TalkArticleItemPlaceholder />
        <div className="h-2 bg-gray-50" />
      </div>
      <div className="flex flex-col gap-20">
        <TalkArticleItemPlaceholder />
        <div className="h-2 bg-gray-50" />
      </div>
      <div className="flex flex-col gap-20">
        <TalkArticleItemPlaceholder />
        <div className="h-2 bg-gray-50" />
      </div>
      <div className="flex flex-col gap-20">
        <TalkArticleItemPlaceholder />
        <div className="h-2 bg-gray-50" />
      </div>
      <div className="flex flex-col gap-20">
        <TalkArticleItemPlaceholder />
        <div className="h-2 bg-gray-50" />
      </div>
    </>
  );

  return (
    <div className="flex flex-col gap-20">
      {isLoading ? (
        placeholder
      ) : (
        <>
          {items.map(articleMetadata => (
            <div key={articleMetadata.id} className="flex flex-col gap-20">
              <TalkArticleItem articleMetadata={articleMetadata} today={today} userId={userId} />
              <div className="h-2 bg-gray-50" />
            </div>
          ))}
          {articles.isFetchingNextPage && placeholder}
          {articles.hasNextPage ? (
            <div ref={ref} className="col-span-full h-8" />
          ) : (
            <div className="col-span-full">
              <EndItems />
            </div>
          )}
        </>
      )}
    </div>
  );
}
