import CmsButton from '@/components/cms/CmsButton';
import CmsRefresh from '@/components/cms/CmsRefresh';
import CmsModelPanel from '@/components/cms/model/CmsModelPanel';
import prisma from '@/prisma/prisma';
import Link from 'next/link';

export default async function CmsAlbumsPage() {
  const albums = await prisma.album.findMany();

  return (
    <div className="flex flex-col gap-16">
      <div className="flex items-center justify-between">
        <div className="text-20">
          Total <span className="font-700 text-primary-500">{albums.length}</span> item(s)
        </div>
        <div className="flex gap-8">
          <CmsRefresh path="/cms/albums" />
          <Link href={'/cms/albums/create'}>
            <CmsButton>Create</CmsButton>
          </Link>
        </div>
      </div>
      <CmsModelPanel
        options={{
          fields: [
            { key: 'title', label: 'Title', style: 'font-700 w-[200px]', type: 'string' },
            { key: 'description', label: 'Description', style: 'grow', type: 'string' },
            { key: 'colors', label: 'Colors', style: 'text-16 code', type: 'strings' },
            { key: 'release', label: 'Release', style: 'text-16 code', type: 'date' },
          ],
          items: albums,
          name: 'album',
          path: '/cms/albums',
        }}
      />
    </div>
  );
}
