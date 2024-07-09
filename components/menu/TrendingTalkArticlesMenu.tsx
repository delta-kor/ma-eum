import Icon from '@/components/core/Icon';
import Translate from '@/components/core/Translate';
import TrendingTalkArticlesMenuItem from '@/components/menu/TrendingTalkArticlesMenuItem';
import { TalkService } from '@/services/talk.service';
import Link from 'next/link';

export default async function TrendingTalkArticlesMenu() {
  const articles = await TalkService.getTrendingArticlesMetadata();

  return (
    <div className="flex flex-col gap-12">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-10">
          <Icon type="talk" className="size-20 text-primary-500 lg:size-20" />
          <div className="shrink-0 text-22 font-700 text-primary-500">Talk</div>
        </div>
        <div className="grow text-18 font-500 text-gray-500">
          <Translate>$talk_article_trending</Translate>
        </div>
        <Link href={`/talk`} className="shrink-0 text-16 font-400 text-gray-200">
          <Translate>$view_all</Translate>
        </Link>
      </div>
      <div className="flex flex-col gap-12">
        {articles.map(metadata => (
          <TrendingTalkArticlesMenuItem key={metadata.id} metadata={metadata} />
        ))}
      </div>
    </div>
  );
}
