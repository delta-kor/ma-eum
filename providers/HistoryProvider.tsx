'use client';

import { History, getMatchingPage, joinPathSearch } from '@/utils/history.util';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ReactNode, createContext, useEffect, useRef } from 'react';

interface Context {
  back: () => void;
}

export const HistoryContext = createContext<Context>({} as Context);

interface Props {
  children: ReactNode;
}

export default function HistoryProvider({ children }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const lastPathnameRef = useRef<null | string>(null);
  const lastSearchRef = useRef<null | string>(null);

  const historiesRef = useRef<History[]>([]);

  useEffect(() => {
    handleRouteChange();
  }, [pathname, searchParams]);

  function handleRouteChange() {
    const lastPathname = lastPathnameRef.current;
    const lastSearch = lastSearchRef.current;
    const histories = historiesRef.current;

    const search = searchParams.toString();
    const page = getMatchingPage(pathname);

    lastPathnameRef.current = pathname;
    lastSearchRef.current = search;

    if (lastPathname === pathname && lastSearch === search) return;

    const existingPath = histories.find(
      ([path, query]) => getMatchingPage(path).path === page.path && query === search
    );
    if (existingPath) {
      const index = histories.indexOf(existingPath);
      histories.splice(index);
    }

    histories.push([pathname, search]);

    if (lastPathname === null || lastSearch === null) return;
    if (page.base) histories.splice(0, histories.length - 1);
  }

  function handleBack() {
    const histories = historiesRef.current;
    const currentPage = getMatchingPage(pathname);

    for (let i = histories.length - 1; i >= 0; i--) {
      const [pathname, search] = histories[i];
      const page = getMatchingPage(pathname);

      if (page.path === currentPage.path) continue;
      if (page.invisible) continue;

      histories.splice(i);

      const url = joinPathSearch(pathname, search);
      router.push(url);

      return;
    }

    histories.splice(0);

    const url = currentPage.back;
    router.replace(url);
  }

  const value: Context = {
    back: handleBack,
  };

  return <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>;
}
