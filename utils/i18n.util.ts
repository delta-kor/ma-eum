import en from '@/locales/en.json';
import ja from '@/locales/ja.json';
import ko from '@/locales/ko.json';

function getTranslation(key: string, locale: any): null | string {
  if (!key) return null;
  if (key[0] !== '$') return null;

  const slicedKey = key.slice(1);
  if (slicedKey in locale) return locale[slicedKey];

  return null;
}

export function i18n(key: string, lang: string): string {
  let locales: any;
  if (lang === 'ko') locales = ko;
  else if (lang === 'ja') locales = ja;
  else locales = en;

  return getTranslation(key, locales) || getTranslation(key, en) || getTranslation(key, ja) || key;
}
