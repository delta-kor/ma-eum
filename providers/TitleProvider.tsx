'use client';

import { ReactNode, createContext, useState } from 'react';

interface Context {
  content: null | string;
  setTitle: (title: string) => void;
}

export const TitleContext = createContext<Context>({
  content: null,
  setTitle: () => {},
});

interface Props {
  children: ReactNode;
}

export default function TitleProvider({ children }: Props) {
  const [title, setTitle] = useState<null | string>(null);

  const value: Context = {
    content: title,
    setTitle,
  };

  return <TitleContext.Provider value={value}>{children}</TitleContext.Provider>;
}
