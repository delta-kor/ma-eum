'use client';

import Translate from '@/components/core/Translate';
import useQuery from '@/hooks/query';
import { TalkArticleSort } from '@/services/talk.service';
import Link from 'next/link';

export default function TalkArticleSortMenu() {
  const query = useQuery();
  const sortQuery = query.get('sort');

  let currentFilter: TalkArticleSort = 'newest';
  if (sortQuery === 'like') currentFilter = 'like';

  return (
    <div className="flex items-center gap-16">
      <Link
        data-active={currentFilter === 'newest'}
        href={query.getQueryUpdatedUrl({ page: '1', sort: 'newest' })}
        className="group flex cursor-pointer items-center"
      >
        <div className="text-16 font-500 text-gray-200 transition-colors group-data-[active=true]:font-600 group-data-[active=true]:text-primary-500">
          <Translate>$sort_newest</Translate>
        </div>
      </Link>
      <Link
        data-active={currentFilter === 'like'}
        href={query.getQueryUpdatedUrl({ page: '1', sort: 'like' })}
        className="group flex cursor-pointer items-center"
      >
        <div className="text-16 font-500 text-gray-200 transition-colors group-data-[active=true]:font-600 group-data-[active=true]:text-primary-500">
          <Translate>$sort_like</Translate>
        </div>
      </Link>
    </div>
  );
}
