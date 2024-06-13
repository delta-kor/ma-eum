import CmsModelPanel from '@/components/cms/model/CmsModelPanel';
import prisma from '@/prisma/prisma';

export const dynamic = 'force-dynamic';

export default async function CmsFeedsPage() {
  const feeds = await prisma.feed.findMany({
    orderBy: [{ date: 'desc' }],
    take: 100,
  });

  return (
    <CmsModelPanel
      options={{
        fields: [
          { key: 'type', label: 'Type', style: 'text-16 code', type: 'string' },
          { key: 'title', label: 'Title', style: 'text-16 line-clamp-3 w-[300px]', type: 'string' },
          { key: 'date', label: 'Date', style: 'text-16 code text-primary-500', type: 'date' },
          { key: 'members', label: 'Members', style: 'text-16 code italic', type: 'strings' },
        ],
        items: feeds,
        name: 'feed',
        path: '/cms/feeds',
      }}
    />
  );
}
