import DetailsContent from '@/components/core/header/DetailsContent';
import TalkLoginPageFrame from '@/components/talk/login/TalkLoginPageFrame';
import Auth from '@/utils/auth.util';
import MetaUtil from '@/utils/meta.util';
import { Metadata } from 'next';
import { RedirectType, redirect } from 'next/navigation';

export const revalidate = 0;

export default async function TalkLoginPage() {
  const token = Auth.getTokenCookie();
  if (token !== null) {
    const user = await Auth.verifyToken(token);
    if (user) return redirect('/talk', RedirectType.replace);
  }

  return (
    <DetailsContent>
      <div className="px-24">
        <div className="pb-24 pt-16 lg:mx-auto lg:max-w-screen-lg lg:pt-24">
          <TalkLoginPageFrame />
        </div>
      </div>
    </DetailsContent>
  );
}

export function generateMetadata(): Metadata {
  return MetaUtil.getIsolatedPage('Login', '/talk/login');
}
