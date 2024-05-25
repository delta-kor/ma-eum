import CmsModelPanel from '@/components/cms/model/CmsModelPanel';
import prisma from '@/prisma/prisma';

export const dynamic = 'force-dynamic';

export default async function CmsCategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: [{ type: 'asc' }, { order: 'asc' }],
  });

  return (
    <CmsModelPanel
      options={{
        fields: [
          { key: 'title', label: 'Title', style: 'font-700 w-[300px]', type: 'string' },
          {
            key: 'description',
            label: 'Description',
            optional: true,
            style: 'grow',
            type: 'string',
          },
          { key: 'order', label: 'Order', style: 'text-16 code', type: 'number' },
          { key: 'type', label: 'Type', style: 'text-16 code', type: 'string' },
        ],
        items: categories,
        name: 'category',
        path: '/cms/categories',
      }}
    />
  );
}
