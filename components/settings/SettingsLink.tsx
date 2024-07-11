import Icon from '@/components/core/Icon';
import Translate from '@/components/core/Translate';
import Link from 'next/link';

interface Props {
  type: 'changelog' | 'credits' | 'info' | 'notice';
}

export default function SettingsLink({ type }: Props) {
  if (type === 'info')
    return (
      <Link
        href={`/settings/info`}
        className="flex items-center gap-8 rounded-8 bg-gray-50 px-16 py-12"
      >
        <div className="grow text-16 font-600 text-black">
          <Translate>$settings_info</Translate>
        </div>
        <Icon type="right" className="w-14 text-gray-200" />
      </Link>
    );

  if (type === 'notice')
    return (
      <a
        href="https://hurricane-jury-959.notion.site/Notice-75a59166f13d46a29d4f25fc2a196702"
        target="_blank"
        className="flex items-center justify-between rounded-8 bg-gray-50 px-16 py-12"
      >
        <div className="text-16 font-600 text-black">
          <Translate>$settings_notice</Translate>
        </div>
        <Icon type="right" className="w-14 text-gray-200" />
      </a>
    );

  if (type === 'credits')
    return (
      <a
        href="https://hurricane-jury-959.notion.site/Credits-f2f9bd0a364d4a1cbe3dcb9b880ceaca"
        target="_blank"
        className="flex items-center justify-between rounded-8 bg-gray-50 px-16 py-12"
      >
        <div className="text-16 font-600 text-black">
          <Translate>$settings_credits</Translate>
        </div>
        <Icon type="right" className="w-14 text-gray-200" />
      </a>
    );

  if (type === 'changelog')
    return (
      <a
        href="https://hurricane-jury-959.notion.site/Changelogs-ea80a80a27dc425486119310cac16b72"
        target="_blank"
        className="flex items-center justify-between rounded-8 bg-gray-50 px-16 py-12"
      >
        <div className="text-16 font-600 text-black">
          <Translate>$settings_changelogs</Translate>
        </div>
        <Icon type="right" className="w-14 text-gray-200" />
      </a>
    );
}
