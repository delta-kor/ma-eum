import { ExtendedCmsVideo } from '@/components/cms/videos/CmsVideosInfo';
import CmsVideosPanel from '@/components/cms/videos/CmsVideosPanel';
import prisma from '@/prisma/prisma';
import { PrismaUtil } from '@/utils/prisma.util';

export const dynamic = 'force-dynamic';

export default async function CmsMusicsPage() {
  const videosData = prisma.video.findMany({
    include: { categories: true, session: true, ...PrismaUtil.extendVideoAll() },
    orderBy: [{ date: 'desc' }],
  });
  const categoriesData = prisma.category.findMany({
    orderBy: [{ type: 'asc' }, { order: 'asc' }],
  });

  const [videos, categories] = await Promise.all([videosData, categoriesData]);

  return <CmsVideosPanel categories={categories} videos={videos as ExtendedCmsVideo[]} />;
}
