import Icon from '@/components/core/Icon';
import SoftLink from '@/components/core/SoftLink';
import useQuery from '@/hooks/query';
import Link from 'next/link';

interface Props {
  currentPage: number;
  totalPages: number;
}

export default function TalkArticlePagination({ currentPage, totalPages }: Props) {
  const query = useQuery();

  const displayedPages: (null | number)[] = [1];

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const prevPage = hasPrev ? currentPage - 1 : 1;
  const nextPage = hasNext ? currentPage + 1 : totalPages;

  const hasSkip = currentPage > 4 && totalPages > 5;

  if (hasSkip) {
    displayedPages.push(null);
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      if (i > totalPages) break;
      displayedPages.push(i);
    }
  } else {
    for (let i = 2; i <= Math.min(5, totalPages); i++) {
      displayedPages.push(i);
    }
  }

  return (
    <div className="flex items-center gap-8 self-center">
      <Link
        href={query.getQueryUpdatedHref({ page: prevPage.toString() })}
        scroll
        className="jelly jelly-increased flex size-36 cursor-pointer items-center justify-center rounded-4 hover:bg-gray-50 selected:bg-gray-50"
      >
        <Icon type="left" className="w-12 text-gray-200" />
      </Link>
      {displayedPages.map(item =>
        item === null ? (
          <div key="dot" className="flex size-36 select-none items-center justify-center">
            <div className="text-16 font-600 text-gray-200">...</div>
          </div>
        ) : (
          <SoftLink
            key={item}
            data-active={currentPage === item}
            href={query.getQueryUpdatedHref({ page: item.toString() })}
            scroll
            className="jelly jelly-increased group flex size-36 cursor-pointer items-center justify-center rounded-4 hover:bg-gray-50 data-[active=true]:bg-primary-500 selected:bg-gray-50"
          >
            <div className="text-16 font-600 text-gray-500 group-data-[active=true]:text-white">
              {item}
            </div>
          </SoftLink>
        )
      )}
      <Link
        href={query.getQueryUpdatedHref({ page: nextPage.toString() })}
        scroll
        className="jelly jelly-increased flex size-36 cursor-pointer items-center justify-center rounded-4 hover:bg-gray-50 selected:bg-gray-50"
      >
        <Icon type="right" className="w-12 text-gray-200" />
      </Link>
    </div>
  );
}
