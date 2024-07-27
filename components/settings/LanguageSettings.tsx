'use client';

import useTranslate from '@/hooks/translate';

export default function LanguageSettings() {
  const translate = useTranslate();
  const language = translate.language === 'ko' ? 'ko' : translate.language === 'ja' ? 'ja' : 'en';

  function handleLanguageChange(language: string) {
    translate.setLanguage(language);
  }

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <div className="text-18 font-600 text-black">Language</div>
        <div className="text-16 font-400 text-gray-500">Select preferred language.</div>
      </div>
      <div className="flex flex-wrap items-center gap-8">
        <div
          data-active={language === 'en'}
          onClick={() => handleLanguageChange('en')}
          className="jelly cursor-pointer rounded-8 bg-gray-50 px-12 py-8 text-14 font-600 text-gray-500 hover:scale-105 data-[active=true]:bg-primary-500 data-[active=true]:text-white"
        >
          English
        </div>
        <div
          data-active={language === 'ko'}
          onClick={() => handleLanguageChange('ko')}
          className="jelly cursor-pointer rounded-8 bg-gray-50 px-12 py-8 text-14 font-600 text-gray-500 hover:scale-105 data-[active=true]:bg-primary-500 data-[active=true]:text-white"
        >
          한국어
        </div>
        <div
          data-active={language === 'ja'}
          onClick={() => handleLanguageChange('ja')}
          className="jelly cursor-pointer rounded-8 bg-gray-50 px-12 py-8 text-14 font-600 text-gray-500 hover:scale-105 data-[active=true]:bg-primary-500 data-[active=true]:text-white"
        >
          日本語
        </div>
      </div>
    </div>
  );
}
