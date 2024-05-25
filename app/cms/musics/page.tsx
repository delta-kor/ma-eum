import CmsModelPanel from '@/components/cms/model/CmsModelPanel';
import prisma from '@/prisma/prisma';

export const dynamic = 'force-dynamic';

export default async function CmsMusicsPage() {
  const musics = await prisma.music.findMany({
    orderBy: [{ album: { release: 'desc' } }, { order: 'asc' }],
  });

  return (
    <CmsModelPanel
      options={{
        fields: [
          { key: 'title', label: 'Title', style: 'font-700 w-[300px]', type: 'string' },
          { key: 'shortTitle', label: 'Short Title', style: 'w-[300px] grow', type: 'string' },
          { key: 'order', label: 'Order', style: 'text-16 code', type: 'number' },
          {
            key: 'album',
            label: 'Album',
            modelName: 'album',
            optional: true,
            style: 'code',
            type: 'model',
          },
        ],
        items: musics,
        name: 'music',
        path: '/cms/musics',
      }}
    />
  );
}
