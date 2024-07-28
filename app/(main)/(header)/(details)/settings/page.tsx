import Coffee from '@/components/core/Coffee';
import DetailsContent from '@/components/core/header/DetailsContent';
import Title from '@/components/core/header/Title';
import LanguageSettings from '@/components/settings/LanguageSettings';
import SettingsLink from '@/components/settings/SettingsLink';
import TalkSettings from '@/components/settings/TalkSettings';
import MetaUtil from '@/utils/meta.util';
import { Metadata } from 'next';

export const revalidate = 18000;
export const runtime = 'edge';

export default function SettingsPage() {
  return (
    <DetailsContent>
      <Title>Settings</Title>
      <div className="px-24">
        <div className="pb-24 lg:mx-auto lg:max-w-screen-lg lg:pt-24">
          <div className="flex flex-col gap-24 pt-36 lg:pt-0">
            <LanguageSettings />
            <div className="h-1 self-stretch bg-gray-100" />
            <TalkSettings />
            <div className="h-1 self-stretch bg-gray-100" />
            <div className="grid w-full grid-cols-1 gap-8 lg:max-w-[520px]">
              <SettingsLink type="info" />
              <SettingsLink type="notice" />
              <SettingsLink type="credits" />
              <SettingsLink type="changelog" />
              <SettingsLink type="download" />
            </div>
            <Coffee />
          </div>
        </div>
      </div>
    </DetailsContent>
  );
}

export function generateMetadata(): Metadata {
  return MetaUtil.getSubpage('Settings', 'MAEUM Settings', '/settings');
}
