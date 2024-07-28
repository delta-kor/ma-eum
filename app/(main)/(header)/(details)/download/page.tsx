import DetailsContent from '@/components/core/header/DetailsContent';
import Title from '@/components/core/header/Title';
import DownloadMenu from '@/components/menu/DownloadMenu';
import MetaUtil from '@/utils/meta.util';
import { Metadata } from 'next';

export const runtime = 'edge';
export const revalidate = 18000;

export default function DownloadPage() {
  return (
    <DetailsContent>
      <Title>Download App</Title>
      <div className="px-24">
        <div className="pb-24 lg:mx-auto lg:max-w-screen-lg lg:pt-24">
          <DownloadMenu />
        </div>
      </div>
    </DetailsContent>
  );
}

export function generateMetadata(): Metadata {
  return MetaUtil.getSubpage(
    'Download',
    'Download and install the latest MAEUM(마음) app.',
    '/download'
  );
}
