'use client';

import SoftLink from '@/components/core/SoftLink';
import Translate from '@/components/core/Translate';
import useQuery from '@/hooks/query';
import { TalkArticleSort } from '@/services/talk.service';

export default function TalkArticleSortMenu() {
  const query = useQuery();
  const sortQuery = query.get('sort');

  let currentFilter: TalkArticleSort = 'newest';
  if (sortQuery === 'like') currentFilter = 'like';

  return (
    <div className="flex items-center gap-16">
      <SoftLink
        data-active={currentFilter === 'newest'}
        href={query.getQueryUpdatedHref({ page: '1', sort: 'newest' })}
        className="group flex cursor-pointer items-center"
      >
        <div className="text-16 font-500 text-gray-200 transition-colors group-data-[active=true]:font-600 group-data-[active=true]:text-primary-500">
          <Translate>$sort_newest</Translate>
        </div>
      </SoftLink>
      <SoftLink
        data-active={currentFilter === 'like'}
        href={query.getQueryUpdatedHref({ page: '1', sort: 'like' })}
        className="group flex cursor-pointer items-center"
      >
        <div className="text-16 font-500 text-gray-200 transition-colors group-data-[active=true]:font-600 group-data-[active=true]:text-primary-500">
          <Translate>$sort_like</Translate>
        </div>
      </SoftLink>
    </div>
  );
}
