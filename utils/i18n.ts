import en from '@/locales/en.json';
import ko from '@/locales/ko.json';

export type I18nKey = keyof (typeof en & typeof ko);

export function i18n(key: string, lang: string): string {
  let locales: any;
  if (lang === 'ko') locales = ko;
  else if (lang === 'en') locales = en;
  else locales = en;

  if (key[0] === '$') {
    const slicedKey = key.slice(1);
    if (slicedKey in locales) return locales[slicedKey];
    return `!$${key}`;
  } else return key;
}
