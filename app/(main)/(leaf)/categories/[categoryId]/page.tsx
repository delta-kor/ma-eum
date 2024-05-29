import DetailsContent from '@/components/core/header/DetailsContent';
import Title from '@/components/core/header/Title';
import CategoryVideoList from '@/components/video/CategoryVideoList';
import { CategoryService } from '@/services/category';
import { VideoService } from '@/services/video';
import { notFound } from 'next/navigation';

export const revalidate = 0;

interface Props {
  params: {
    categoryId: string;
  };
}

export default async function CategoryPage({ params: { categoryId } }: Props) {
  const categoryData = CategoryService.getOne(categoryId);
  const videosData = VideoService.getCategoryVideos(categoryId);

  const [category, videos] = await Promise.all([categoryData, videosData]);
  if (!category) return notFound();

  return (
    <DetailsContent>
      <Title>{category.title}</Title>
      <CategoryVideoList category={category} preloadedVideos={videos} />
    </DetailsContent>
  );
}
