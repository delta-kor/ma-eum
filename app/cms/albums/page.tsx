import CmsModelPanel from '@/components/cms/model/CmsModelPanel';
import prisma from '@/prisma/prisma';

export const dynamic = 'force-dynamic';

export default async function CmsAlbumsPage() {
  const albums = await prisma.album.findMany({ orderBy: { release: 'desc' } });

  return (
    <CmsModelPanel
      options={{
        fields: [
          { key: 'title', label: 'Title', style: 'font-700 w-[200px]', type: 'string' },
          { key: 'description', label: 'Description', style: 'grow', type: 'string' },
          { key: 'isMini', label: 'Is Mini', style: 'text-16 code', type: 'boolean' },
          { key: 'colors', label: 'Colors', style: 'text-16 code', type: 'strings' },
          { key: 'release', label: 'Release', style: 'text-16 code', type: 'date' },
        ],
        items: albums,
        name: 'album',
        path: '/cms/albums',
      }}
    />
  );
}
