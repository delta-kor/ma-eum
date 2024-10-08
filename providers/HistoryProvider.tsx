'use client';

import useSafeSearchParams from '@/hooks/safe-search-params';
import { History, getMatchingPage, joinPathSearch } from '@/utils/history.util';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, createContext, useEffect, useRef, useState } from 'react';

interface Context {
  back: () => void;
  getPreviousUrl: () => string;
  reset: () => void;
  scroll: number;
  setScroll: (scroll: number) => void;
}

export const HistoryContext = createContext<Context>({} as Context);

interface Props {
  children: ReactNode;
}

export default function HistoryProvider({ children }: Props) {
  const pathname = usePathname();
  const { searchParams } = useSafeSearchParams();
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

    scrollRef.current = 0;

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

  function getPreviousUrl() {
    const histories = historiesRef.current;
    const currentPage = getMatchingPage(pathname);

    for (let i = histories.length - 1; i >= 0; i--) {
      const [pathname, search] = histories[i];
      const page = getMatchingPage(pathname);

      if (page.path === currentPage.path) continue;
      if (page.invisible) continue;

      const url = joinPathSearch(pathname, search);
      return url;
    }

    const url = currentPage.back;
    return url;
  }

  function reset() {
    historiesRef.current = [];
    lastPathnameRef.current = null;
    lastSearchRef.current = null;
    scrollRef.current = 0;
  }

  function handleScroll() {
    const lastScroll = scrollRef.current;
    const currentScroll = window.scrollY;
    if (lastScroll <= 100 || currentScroll !== 0) {
      scrollRef.current = currentScroll;
    }
  }

  function handleSetScroll(scroll: number) {
    scrollRef.current = scroll;
  }

  const value: Context = {
    back: handleBack,
    getPreviousUrl,
    reset,
    scroll: scrollPosition,
    setScroll: handleSetScroll,
  };

  return <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>;
}
