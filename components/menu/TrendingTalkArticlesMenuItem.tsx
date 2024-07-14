import Icon from '@/components/core/Icon';
import { TrendingTalkArticleMetadata } from '@/services/talk.service';
import Link from 'next/link';

interface Props {
  metadata: TrendingTalkArticleMetadata;
}

export default function TrendingTalkArticlesMenuItem({ metadata }: Props) {
  return (
    <Link href={`/talk/article/${metadata.id}`} className="flex rounded-16 bg-gray-50 px-24 py-16">
      <div className="flex grow flex-col gap-2">
        <div className="truncate text-14 font-500 text-gray-500">{metadata.nickname}</div>
        <div className="flex flex-col gap-4">
          <div className="truncate text-18 font-600 text-black">{metadata.title}</div>
          <div className="line-clamp-2 whitespace-pre-line text-14 font-400 text-gray-500">
            {metadata.content}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-8">
        <Icon type="heart" className="w-18 shrink-0 text-gray-200" />
        <div className="text-18 font-500 text-gray-500">{metadata.likes}</div>
      </div>
    </Link>
  );
}

export function TrendingTalkArticlesMenuItemPlaceholder() {
  return <div className="flex h-[93px] animate-pulse rounded-16 bg-gray-50 px-24 py-16" />;
}
