import DetailsContent from '@/components/core/header/DetailsContent';
import Title from '@/components/core/header/Title';
import CategoryVideoList from '@/components/video/CategoryVideoList';
import { CategoryService } from '@/services/category.service';
import { VideoService } from '@/services/video.service';
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
  const categories = await CategoryService.getAll();
  return categories.map(category => ({ categoryId: category.id }));
}
