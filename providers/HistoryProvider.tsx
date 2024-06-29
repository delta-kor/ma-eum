'use client';

import { History, getMatchingPage, joinPathSearch } from '@/utils/history.util';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ReactNode, createContext, useEffect, useRef, useState } from 'react';

interface Context {
  back: () => void;
  scroll: number;
}

export const HistoryContext = createContext<Context>({} as Context);

interface Props {
  children: ReactNode;
}

export default function HistoryProvider({ children }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [scrollPosition, setScrollPosition] = useState<number>(-1);

  const lastPathnameRef = useRef<null | string>(null);
  const lastSearchRef = useRef<null | string>(null);
  const scrollRef = useRef<number>(0);

  const historiesRef = useRef<History[]>([]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    handleRouteChange();
  }, [pathname, searchParams]);

  function handleRouteChange() {
    const lastPathname = lastPathnameRef.current;
    const lastSearch = lastSearchRef.current;
    const histories = historiesRef.current;
    const scroll = scrollRef.current;

    const page = getMatchingPage(pathname);
    const search = searchParams.toString();

    lastPathnameRef.current = pathname;
    lastSearchRef.current = search;

    if (lastPathname === pathname && lastSearch === search) return;

    if (lastPathname) {
      const lastPage = getMatchingPage(lastPathname);
      const lastHistory = histories.find(
        ([path, query]) => getMatchingPage(path).path === lastPage.path && query === lastSearch
      );
      if (lastHistory) {
        console.log('setting scroll', lastHistory[0], scroll);
        lastHistory[2] = scroll;
      }
    }

    const existingPath = histories.find(
      ([path, query]) => getMatchingPage(path).path === page.path && query === search
    );
    if (existingPath) {
      const index = histories.indexOf(existingPath);
      histories.splice(index);
    }

    histories.push([pathname, search, -1]);
    setScrollPosition(-1);

    if (lastPathname === null || lastSearch === null) return;
    if (page.base) histories.splice(0, histories.length - 1);
  }

  function handleBack() {
    const histories = historiesRef.current;
    const currentPage = getMatchingPage(pathname);

    for (let i = histories.length - 1; i >= 0; i--) {
      const [pathname, search, scroll] = histories[i];
      const page = getMatchingPage(pathname);

      if (page.path === currentPage.path) continue;
      if (page.invisible) continue;

      histories.splice(i);

      const url = joinPathSearch(pathname, search);
      setScrollPosition(scroll);
      router.push(url, { scroll: false });

      return;
    }

    histories.splice(0);

    const url = currentPage.back;
    setScrollPosition(-1);
    router.replace(url);
  }

  function handleScroll() {
    const lastScroll = scrollRef.current;
    const currentScroll = window.scrollY;
    if (lastScroll <= 100 || currentScroll !== 0) {
      scrollRef.current = currentScroll;
    }
  }

  const value: Context = {
    back: handleBack,
    scroll: scrollPosition,
  };

  return <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>;
}
