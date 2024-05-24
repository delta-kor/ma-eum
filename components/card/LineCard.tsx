import GradientIcon from '@/components/core/GradientIcon';
import { Category } from '@prisma/client';

interface Props {
  category: Category;
}

export default function LineCard({ category }: Props) {
  return (
    <div className="flex cursor-pointer items-center gap-12">
      <div className="flex rounded-8 bg-primary-100 p-8">
        <GradientIcon type="live" className="h-16" />
      </div>
      <div className="grow text-18 font-500">{category.title}</div>
    </div>
  );
}
