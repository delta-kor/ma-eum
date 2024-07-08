import Icon from '@/components/core/Icon';
import { ReactNode, UIEvent, useRef, useState } from 'react';

interface Props {
  children: ReactNode[];
}

export default function OfficialVideoCarousel({ children }: Props) {
  const [currentPage, setCurrentPage] = useState<number>(0);

  const scrollRef = useRef<HTMLDivElement>(null);

  function handleScroll(e: UIEvent<HTMLDivElement>) {
    const target = e.target as HTMLDivElement;
    const scrollLeft = target.scrollLeft;
    const currentPage = Math.round(scrollLeft / window.innerWidth);
    setCurrentPage(currentPage);
  }

  function handlePageChange(page: number) {
    if (!scrollRef.current) return;

    const element = scrollRef.current;
    element.scrollTo({
      behavior: 'smooth',
      left: page * element.clientWidth,
    });
  }

  function handlePageChangeDelta(delta: number) {
    const nextPage = currentPage + delta;
    handlePageChange(nextPage);
  }

  const rows = 3;
  const pages = Math.ceil(children.length / rows);
  const items = Array.from({ length: pages }, (_, index) => (
    <div key={index} className="flex flex-col gap-8">
      {children.slice(index * rows, index * rows + rows)}
    </div>
  ));

  const forcePagination = children.length > rows * 2;

  return (
    <div data-force-pagination={forcePagination} className="group flex flex-col gap-12">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="scrollbar-hide -mx-24 flex snap-x snap-mandatory overflow-x-scroll lg:mx-0 lg:overflow-x-auto lg:group-data-[force-pagination=true]:overflow-x-scroll"
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="w-full shrink-0 snap-start px-24 lg:w-auto lg:grow lg:px-0 lg:group-data-[force-pagination=true]:w-1/2"
          >
            {item}
          </div>
        ))}
      </div>
      {pages > 1 && (
        <div className="lg:hidden lg:group-data-[force-pagination=true]:block">
          <div className="flex items-center justify-center gap-24 lg:gap-16">
            <div onClick={() => handlePageChangeDelta(-1)} className="cursor-pointer p-10">
              <Icon type="left" className="w-12 text-gray-200" />
            </div>
            <div className="flex gap-4 lg:hidden">
              {Array.from({ length: pages }, (_, index) => (
                <div
                  key={index}
                  data-active={currentPage === index}
                  onClick={() => handlePageChange(index)}
                  className="group flex size-32 cursor-pointer items-center justify-center rounded-full transition-colors data-[active=true]:bg-primary-500"
                >
                  <div className="text-14 font-600 text-gray-500 transition-colors group-data-[active=true]:text-white">
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
            <div onClick={() => handlePageChangeDelta(1)} className="cursor-pointer p-10">
              <Icon type="right" className="w-12 text-gray-200" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
