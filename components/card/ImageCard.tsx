import LazyImage from '@/components/core/LazyImage';
import { ImageUrl } from '@/utils/url.util';
import { Category } from '@prisma/client';
import Link from 'next/link';

interface Props {
  category: Category;
}

export default function ImageCard({ category }: Props) {
  return (
    <Link
      href={`/videos/categories/${category.id}`}
      prefetch={false}
      className="jelly relative shrink-0 grow cursor-pointer rounded-16 border-3 border-gray-100 hover:scale-[1.03]"
    >
      <LazyImage
        alt={category.title}
        src={ImageUrl.category(category.id)}
        contain
        className="absolute left-1/2 top-1/2 h-2/3 w-3/5 -translate-x-1/2 -translate-y-1/2"
      />
    </Link>
  );
}
