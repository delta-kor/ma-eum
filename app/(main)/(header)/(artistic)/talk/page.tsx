import TalkArticleList from '@/components/talk/TalkArticleList';
import TalkArticleListMenu from '@/components/talk/TalkArticleListMenu';
import { TalkService } from '@/services/talk.service';
import Auth from '@/utils/auth.util';

export const revalidate = 0;

export default async function TalkPage() {
  const token = Auth.getTokenCookie();

  const articlesMetadataData = TalkService.getArticlesMetadata({ cursor: null, limit: 10 });
  const userData = token ? Auth.verifyToken(token) : null;

  const [articlesMetadata, user] = await Promise.all([articlesMetadataData, userData]);

  return (
    <div className="px-24 pb-24">
      <div className="mx-auto mt-artistic-header-height-md w-full max-w-screen-lg lg:mt-artistic-header-height-lg lg:pt-32">
        <div className="flex flex-col gap-16">
          <TalkArticleListMenu user={user} />
          <TalkArticleList preloadedArticlesMetadata={articlesMetadata} user={user} />
        </div>
      </div>
    </div>
  );
}
