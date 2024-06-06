import { ReactNode, UIEvent, useState } from 'react';

interface Props {
  children: ReactNode[];
}

export default function OfficialVideoCarousel({ children }: Props) {
  const [currentPage, setCurrentPage] = useState<number>(0);

  function handleScroll(e: UIEvent<HTMLDivElement>) {
    const target = e.target as HTMLDivElement;
    const scrollLeft = target.scrollLeft;
    const currentPage = Math.round(scrollLeft / window.innerWidth);
    setCurrentPage(currentPage);
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
        onScroll={handleScroll}
        className="scrollbar-hide -mx-24 flex snap-x snap-mandatory overflow-x-scroll"
      >
        {items.map((item, index) => (
          <div key={index} className="w-screen shrink-0 snap-start px-24">
            {item}
          </div>
        ))}
      </div>
      {pages > 1 && (
        <div className="flex gap-4 self-center">
          {Array.from({ length: pages }, (_, index) => (
            <div
              key={index}
              data-active={currentPage === index}
              className="size-6 rounded-full bg-gray-200 transition-colors data-[active=true]:bg-primary-500"
            />
          ))}
        </div>
      )}
    </div>
  );
}
