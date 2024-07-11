'use client';

import SoftLink from '@/components/core/SoftLink';
import TalkArticleItem, {
  TalkArticleItemPlaceholder,
} from '@/components/talk/article/TalkArticleItem';
import useQuery from '@/hooks/query';
import { trpc } from '@/hooks/trpc';
import { DateTime } from 'luxon';

interface Props {
  userId: null | string;
}

export default function TalkArticleList({ userId }: Props) {
  const query = useQuery();
  const currentPage = parseInt(query.get('page') || '1');
  const sort = query.get('sort') === 'like' ? 'like' : 'newest';

  const articles = trpc.talk.getArticlesMetadata.useQuery(
    { cursor: currentPage - 1, sort },
    {
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    }
  );

  const items = articles.data?.items || [];
  const totalPages = articles.data?.pages || 1;
  const isLoading = articles.isLoading;

  const today = DateTime.local({ zone: 'Asia/Seoul' }).toJSDate();
  const displayedPages: (null | number)[] = [];
  if (currentPage > 4) {
    displayedPages.push(1, null);
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      if (i > totalPages) break;
      displayedPages.push(i);
    }
  } else {
    for (let i = 1; i <= Math.min(5, totalPages); i++) {
      displayedPages.push(i);
    }
  }

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
      <div className="flex items-center gap-8 self-center">
        {displayedPages.map(page =>
          page === null ? (
            <div key="dot" className="flex size-36 select-none items-center justify-center">
              <div className="text-16 font-600 text-gray-200">...</div>
            </div>
          ) : (
            <SoftLink
              key={page}
              data-active={page === currentPage}
              href={query.getQueryUpdatedHref({ page: page.toString() })}
              scroll
              className="group flex size-36 cursor-pointer items-center justify-center rounded-4 data-[active=true]:bg-primary-500"
            >
              <div className="text-16 font-600 text-gray-500 group-data-[active=true]:text-white">
                {page}
              </div>
            </SoftLink>
          )
        )}
      </div>
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
