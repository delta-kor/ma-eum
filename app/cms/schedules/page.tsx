import CmsModelPanel from '@/components/cms/model/CmsModelPanel';
import prisma from '@/prisma/prisma';

export const dynamic = 'force-dynamic';

export default async function CmsSchedulesPage() {
  const schedules = await prisma.schedule.findMany({
    orderBy: [{ date: 'desc' }],
  });

  return (
    <CmsModelPanel
      options={{
        fields: [
          { key: 'title', label: 'Title', style: 'font-700 w-[300px]', type: 'string' },
          { key: 'date', label: 'Date', style: 'text-16 code text-primary-500', type: 'datetime' },
          {
            key: 'dateDetails',
            label: 'Date Details',
            optional: true,
            style: 'text-16 code grow',
            type: 'string',
          },
          { key: 'members', label: 'Members', style: 'text-16 code italic', type: 'strings' },
          {
            key: 'url',
            label: 'Url',
            optional: true,
            style: 'text-16 code underline text-gray-500 max-w-[200px] truncate',
            type: 'string',
          },
          { key: 'isAllDay', label: 'Is All Day', style: 'text-16 code w-[24px]', type: 'boolean' },
          { key: 'type', label: 'Type', style: 'text-16 code', type: 'string' },
        ],
        items: schedules,
        name: 'schedule',
        path: '/cms/schedules',
      }}
    />
  );
}
