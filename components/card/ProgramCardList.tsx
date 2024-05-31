import ProgramCard from '@/components/card/ProgramCard';
import { CategoryService } from '@/services/category.service';
import { CategoryType } from '@prisma/client';

export default async function ProgramCardList() {
  const categories = await CategoryService.getAll();
  const programCategories = categories.filter(category => category.type === CategoryType.PROGRAM);

  return (
    <div className="flex flex-wrap items-center gap-12 px-24">
      {programCategories.map(category => (
        <ProgramCard key={category.id} category={category} />
      ))}
    </div>
  );
}
