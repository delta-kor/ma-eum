import { ImageUrl } from '@/utils/url';
import { Category } from '@prisma/client';

interface Props {
  category: Category;
}

export default function ImageCard({ category }: Props) {
  return (
    <div className="relative shrink-0 grow cursor-pointer rounded-16 border-3 border-gray-100">
      <img
        alt={category.title}
        src={ImageUrl.category(category.id)}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
}
