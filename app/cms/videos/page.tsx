import { ExtendedCmsVideo } from '@/components/cms/videos/CmsVideosInfo';
import CmsVideosPanel from '@/components/cms/videos/CmsVideosPanel';
import prisma from '@/prisma/prisma';
import { PrismaUtil } from '@/utils/prisma.util';

export const dynamic = 'force-dynamic';

export default async function CmsVideosPage() {
  const sort: any = process.env.CMS_ORDER_BY_DATE === '1' ? { date: 'desc' } : { index: 'desc' };

  const videosData = prisma.video.findMany({
    include: { categories: true, session: true, ...PrismaUtil.extendVideoAll() },
    orderBy: [sort],
  });
  const categoriesData = prisma.category.findMany({
    orderBy: [{ type: 'asc' }, { order: 'asc' }],
  });

  const [videos, categories] = await Promise.all([videosData, categoriesData]);

  return <CmsVideosPanel categories={categories} videos={videos as ExtendedCmsVideo[]} />;
}
