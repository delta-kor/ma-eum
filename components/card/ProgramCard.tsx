import Icon from '@/components/core/Icon';
import { Category } from '@prisma/client';
import Link from 'next/link';

interface Props {
  category: Category;
}

export default function ProgramCard({ category }: Props) {
  return (
    <Link
      href={`/videos/categories/${category.id}`}
      className="jelly jelly-reduced flex grow basis-0 cursor-pointer items-center gap-10 rounded-16 border-3 border-primary-200 bg-primary-100 px-16 py-12 hover:scale-[1.01]"
    >
      <div className="flex w-full flex-col gap-4">
        <div className="whitespace-nowrap text-16 font-700 text-black">{category.title}</div>
        <div className="whitespace-nowrap text-14 font-500 text-primary-500">
          {category.description}
        </div>
      </div>
      <Icon type="right" className="h-14 shrink-0 text-primary-300" />
    </Link>
  );
}
