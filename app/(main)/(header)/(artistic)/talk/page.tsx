import ScrollInjector from '@/components/core/ScrollInjector';
import TalkArticleList from '@/components/talk/article/TalkArticleList';
import TalkArticleListMenu from '@/components/talk/article/TalkArticleListMenu';
import { TalkService } from '@/services/talk.service';
import Auth from '@/utils/auth.util';
import MetaUtil from '@/utils/meta.util';
import { SearchParams } from '@/utils/url.util';
import { Metadata } from 'next';

export const revalidate = 0;

interface Props {
  searchParams: SearchParams;
}

export default async function TalkPage({ searchParams }: Props) {
  const page = parseInt(searchParams.page || '1');
  const sort = searchParams.sort === 'like' ? 'like' : 'newest';

  const token = Auth.getTokenCookie();
  const userData = token ? Auth.verifyToken(token) : null;

  const articlesData = TalkService.getArticlesMetadata({ cursor: page - 1, limit: 10 }, sort);

  const [user, articles] = await Promise.all([userData, articlesData]);

  return (
    <div className="px-24 pb-24">
      <ScrollInjector />
      <div className="mx-auto mt-artistic-header-height-md w-full max-w-screen-lg lg:mt-artistic-header-height-lg lg:pt-32">
        <div className="flex flex-col gap-16">
          <TalkArticleListMenu user={user} />
          <TalkArticleList
            page={page}
            preloadedArticles={articles}
            sort={sort}
            userId={user?.id || null}
          />
        </div>
      </div>
    </div>
  );
}

export function generateMetadata(): Metadata {
  return MetaUtil.getSubpage(
    'Talk',
    'Share and discuss about CSR(첫사랑) with global fans!',
    '/talk'
  );
}
