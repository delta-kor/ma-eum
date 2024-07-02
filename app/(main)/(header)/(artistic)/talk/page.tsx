import ScrollInjector from '@/components/core/ScrollInjector';
import TalkArticleList from '@/components/talk/article/TalkArticleList';
import TalkArticleListMenu from '@/components/talk/article/TalkArticleListMenu';
import Auth from '@/utils/auth.util';
import MetaUtil from '@/utils/meta.util';
import { Metadata } from 'next';

export const revalidate = 0;

export default async function TalkPage() {
  const token = Auth.getTokenCookie();
  const userData = token ? Auth.verifyToken(token) : null;
  const [user] = await Promise.all([userData]);

  return (
    <div className="px-24 pb-24">
      <ScrollInjector />
      <div className="mx-auto mt-artistic-header-height-md w-full max-w-screen-lg lg:mt-artistic-header-height-lg lg:pt-32">
        <div className="flex flex-col gap-16">
          <TalkArticleListMenu user={user} />
          <TalkArticleList userId={user?.id || null} />
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
