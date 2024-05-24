import Icon from '@/components/core/Icon';
import { Category } from '@prisma/client';

interface Props {
  category: Category;
}

export default function ProgramCard({ category }: Props) {
  return (
    <div className="flex grow basis-0 cursor-pointer items-center gap-10 rounded-16 border-3 border-primary-200 bg-primary-100 px-24 py-16">
      <div className="flex w-full flex-col gap-6">
        <div className="whitespace-nowrap text-18 font-700 text-black">{category.title}</div>
        <div className="whitespace-nowrap text-14 font-500 text-primary-500">
          {category.description}
        </div>
      </div>
      <Icon type="right" className="h-14 shrink-0 text-primary-300" />
    </div>
  );
}
