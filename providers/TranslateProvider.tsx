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

  function handleSetLanguage(lang: string) {
    setLanguage(lang);
    Storage.setItem('maeum_lang', lang);
  }

  return (
    <TranslateContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
      {children}
    </TranslateContext.Provider>
  );
}
