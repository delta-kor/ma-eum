'use client';

import Storage from '@/utils/storage';
import { ReactNode, createContext, useEffect, useState } from 'react';

interface Translate {
  language: string;
}

export const TranslateContext = createContext<Translate>({ language: 'en' });

interface Props {
  children: ReactNode;
}

export default function TranslateProvider({ children }: Props) {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const lang = Storage.getItem('maeum_lang');
    if (lang) setLanguage(lang);
  }, []);

  return <TranslateContext.Provider value={{ language }}>{children}</TranslateContext.Provider>;
}
