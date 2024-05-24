import ImageCard from '@/components/card/ImageCard';
import { CategoryService } from '@/services/category';
import { CategoryType } from '@prisma/client';

export default async function ImageCardList() {
  const categories = await CategoryService.getAll();
  const realityCategories = categories.filter(category => category.type === CategoryType.REALITY);

  return (
    <div className="flex flex-col gap-10 px-24">
      <div className="text-20 font-700 text-black">Reality Shows</div>
      <div className="flex h-64 items-stretch gap-12">
        {realityCategories.map(category => (
          <ImageCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
