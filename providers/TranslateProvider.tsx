'use client';

import Storage from '@/utils/storage.util';
import { ReactNode, createContext, useEffect, useState } from 'react';

interface Translate {
  language: string;
  setLanguage: (lang: string) => void;
}

export const TranslateContext = createContext<Translate>({} as Translate);

interface Props {
  children: ReactNode;
}

export default function TranslateProvider({ children }: Props) {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const lang = Storage.getItem('maeum_lang');
    if (lang) setLanguage(lang);
  }, []);

  return (
    <TranslateContext.Provider value={{ language, setLanguage }}>
      {children}
    </TranslateContext.Provider>
  );
}
