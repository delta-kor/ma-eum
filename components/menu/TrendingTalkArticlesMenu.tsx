'use client';

import Icon from '@/components/core/Icon';
import Translate from '@/components/core/Translate';
import TrendingTalkArticlesMenuItem, {
  TrendingTalkArticlesMenuItemPlaceholder,
} from '@/components/menu/TrendingTalkArticlesMenuItem';
import { trpc } from '@/hooks/trpc';
import Link from 'next/link';

export default function TrendingTalkArticlesMenu() {
  const articles = trpc.talk.getTrendingTalkArticlesMetadata.useQuery();
  const items = articles?.data;

  return (
    <div className="flex flex-col gap-12">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-10">
          <Icon type="talk" className="size-20 text-primary-500" />
          <div className="shrink-0 text-22 font-700 text-primary-500">Talk</div>
        </div>
        <div className="grow text-18 font-500 text-gray-500">
          <Translate>$talk_article_trending</Translate>
        </div>
        <Link
          href={`/talk`}
          className="shrink-0 text-16 font-500 text-gray-500 underline underline-offset-2"
        >
          <Translate>$view_all</Translate>
        </Link>
      </div>
      <div className="flex flex-col gap-12">
        {items
          ? items.map((metadata, index) => (
              <div
                key={metadata.id}
                data-overflow={index > 2}
                className="data-[overflow=true]:hidden lg:!block"
              >
                <TrendingTalkArticlesMenuItem metadata={metadata} />
              </div>
            ))
          : Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                data-overflow={index > 2}
                className="data-[overflow=true]:hidden lg:!block"
              >
                <TrendingTalkArticlesMenuItemPlaceholder />
              </div>
            ))}
      </div>
    </div>
  );
}
