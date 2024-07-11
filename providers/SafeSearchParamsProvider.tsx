'use client';

import { usePathname } from 'next/navigation';
import { ReactNode, createContext, useEffect, useState } from 'react';

interface Context {
  searchParams: URLSearchParams;
  update: () => void;
}

export const SafeSearchParamsContext = createContext<Context>({} as Context);

interface Props {
  children?: ReactNode;
}

export default function SafeSearchParamsProvider({ children }: Props) {
  const [searchParams, setSearchParams] = useState(new URLSearchParams());
  const pathname = usePathname();

  useEffect(() => {
    window.addEventListener('hashchange', handleNavigate);
    handleNavigate();

    return () => {
      window.removeEventListener('hashchange', handleNavigate);
    };
  }, []);

  useEffect(() => {
    update();
  }, [pathname]);

  function handleNavigate() {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    setSearchParams(params);
  }

  function update() {
    handleNavigate();
  }

  return (
    <SafeSearchParamsContext.Provider value={{ searchParams, update }}>
      {children}
    </SafeSearchParamsContext.Provider>
  );
}
