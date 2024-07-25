import GradientIcon from '@/components/core/GradientIcon';
import { ExtendedCategory } from '@/services/category.service';
import Link from 'next/link';

interface Props {
  category: ExtendedCategory;
}

export default function LineCard({ category }: Props) {
  return (
    <Link
      href={`/videos/categories/${category.id}`}
      prefetch={false}
      className="jelly jelly-reduced flex cursor-pointer items-center gap-12 rounded-8 hover:-my-4 hover:-ml-4 hover:-mr-12 hover:bg-gray-50 hover:py-4 hover:pl-4 hover:pr-12"
    >
      <div className="flex rounded-8 bg-primary-100 p-8">
        <GradientIcon type="live" className="h-16" />
      </div>
      <div className="line-clamp-2 grow text-18 font-500 text-black">{category.title}</div>
      <div className="shrink-0 text-16 font-600 text-gray-200">{category._count.videos}</div>
    </Link>
  );
}
