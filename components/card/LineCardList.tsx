import LineCard from '@/components/card/LineCard';
import Translate from '@/components/core/Translate';
import { CategoryService } from '@/services/category';
import { CategoryType } from '@prisma/client';

export default async function LineCardList() {
  const categories = await CategoryService.getAll();
  const othersCategories = categories.filter(category => category.type === CategoryType.OTHERS);

  return (
    <div className="flex flex-col gap-10 px-24">
      <div className="text-20 font-700 text-black">
        <Translate>$others</Translate>
      </div>
      <div className="flex flex-col gap-10">
        {othersCategories.map(category => (
          <LineCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
