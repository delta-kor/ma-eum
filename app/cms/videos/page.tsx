import CmsVideosPanel from '@/components/cms/videos/CmsVideosPanel';
import prisma from '@/prisma/prisma';

export const dynamic = 'force-dynamic';

export default async function CmsMusicsPage() {
  const videosData = prisma.video.findMany({
    include: { categories: true },
    orderBy: [{ date: 'desc' }],
  });
  const categoriesData = prisma.category.findMany({
    orderBy: [{ type: 'asc' }, { order: 'asc' }],
  });

  const [videos, categories] = await Promise.all([videosData, categoriesData]);

  return <CmsVideosPanel categories={categories} videos={videos} />;
}
