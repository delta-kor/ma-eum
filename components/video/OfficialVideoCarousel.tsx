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
    if (nextPage < 0 || nextPage >= pages) return;
    handlePageChange(nextPage);
  }

  const pages = Math.ceil(children.length / 3);
  const items = Array.from({ length: pages }, (_, index) => (
    <div key={index} className="flex flex-col gap-8">
      {children.slice(index * 3, index * 3 + 3)}
    </div>
  ));

  return (
    <div className="flex flex-col gap-12">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="scrollbar-hide -mx-24 flex snap-x snap-mandatory overflow-x-scroll"
      >
        {items.map((item, index) => (
          <div key={index} className="w-full shrink-0 snap-start px-24">
            {item}
          </div>
        ))}
      </div>
      {pages > 1 && (
        <div className="flex items-center justify-center gap-24">
          <div onClick={() => handlePageChangeDelta(-1)} className="cursor-pointer p-10">
            <Icon type="left" className="w-12 text-gray-200" />
          </div>
          <div className="flex gap-4">
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
      )}
    </div>
  );
}
