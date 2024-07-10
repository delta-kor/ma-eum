import DetailsContent from '@/components/core/header/DetailsContent';
import Title from '@/components/core/header/Title';
import LanguageSettings from '@/components/settings/LanguageSettings';
import SettingsData from '@/components/settings/SettingsData';
import SettingsHeader from '@/components/settings/SettingsHeader';
import SettingsInfo from '@/components/settings/SettingsInfo';
import MetaUtil from '@/utils/meta.util';
import { Metadata } from 'next';

export const revalidate = 3600;
export const runtime = 'edge';

export default function SettingsPage() {
  return (
    <DetailsContent>
      <Title>Settings</Title>
      <div className="px-24">
        <div className="pb-24 lg:mx-auto lg:max-w-screen-lg lg:pt-24">
          <div className="flex flex-col gap-24 pt-36 lg:pt-0">
            <SettingsHeader />
            <div className="h-1 self-stretch bg-gray-100" />
            <LanguageSettings />
            <div className="h-1 self-stretch bg-gray-100" />
            <SettingsData />
            <div className="h-1 self-stretch bg-gray-100" />
            <SettingsInfo />
          </div>
        </div>
      </div>
    </DetailsContent>
  );
}

export function generateMetadata(): Metadata {
  return MetaUtil.getSubpage('Settings', 'MAEUM Settings', '/settings');
}
