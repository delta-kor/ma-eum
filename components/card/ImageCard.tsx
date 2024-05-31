import { ImageUrl } from '@/utils/url.util';
import { Category } from '@prisma/client';
import Link from 'next/link';

interface Props {
  category: Category;
}

export default function ImageCard({ category }: Props) {
  return (
    <Link
      href={`/categories/${category.id}`}
      className="relative shrink-0 grow cursor-pointer rounded-16 border-3 border-gray-100"
    >
      <img
        alt={category.title}
        src={ImageUrl.category(category.id)}
        className="absolute left-1/2 top-1/2 h-2/3 w-3/5 -translate-x-1/2 -translate-y-1/2 object-contain"
      />
    </Link>
  );
}
