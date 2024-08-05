'use client';

import { ReactNode, createContext, useState } from 'react';

export type AboutPage = 'discography' | 'introduction' | 'landing' | 'member' | 'profile';

interface Context {
  index: number;
  page: AboutPage;
  setPage: (page: AboutPage, index: number) => void;
}

export const AboutContext = createContext<Context>({} as Context);

interface Props {
  children: ReactNode;
}

export default function AboutProvider({ children }: Props) {
  const [page, setPage] = useState<AboutPage>('landing');
  const [index, setIndex] = useState<number>(0);

  function handleSetPage(page: AboutPage, index: number) {
    setPage(page);
    setIndex(index);
  }

  return (
    <AboutContext.Provider
      value={{
        index,
        page,
        setPage: handleSetPage,
      }}
    >
      {children}
    </AboutContext.Provider>
  );
}
