import DetailsContent from '@/components/core/header/DetailsContent';
import Title from '@/components/core/header/Title';
import CategoryVideoList from '@/components/video/CategoryVideoList';
import { CategoryService } from '@/services/category.service';
import { VideoService } from '@/services/video.service';
import MetaUtil from '@/utils/meta.util';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const revalidate = 3600;

interface Props {
  params: {
    categoryId: string;
  };
}

export default async function CategoryPage({ params: { categoryId } }: Props) {
  const categoryData = CategoryService.getOne(categoryId);
  const videosData = VideoService.getCategoryVideos(categoryId, null);

  const [category, videos] = await Promise.all([categoryData, videosData]);
  if (!category) return notFound();

  return (
    <DetailsContent>
      <Title>{category.title}</Title>
      <CategoryVideoList category={category} preloadedVideos={videos} />
    </DetailsContent>
  );
}

export async function generateStaticParams() {
  if (process.env.GENERATE_STATIC_PAGES !== '1') return [];

  const categories = await CategoryService.getAll();
  return categories.map(category => ({ categoryId: category.id }));
}

export async function generateMetadata({ params: { categoryId } }: Props): Promise<Metadata> {
  const category = await CategoryService.getOne(categoryId);
  if (!category) return notFound();

  const title = category.title;
  const description = `Watch playlist - ${title} of CSR(첫사랑).`;
  return MetaUtil.getSubpage(title, description, `/videos/categories/${category.id}`);
}
