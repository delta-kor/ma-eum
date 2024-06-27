import DetailsContent from '@/components/core/header/DetailsContent';
import TalkWriteFrame from '@/components/talk/write/TalkWriteFrame';
import Auth from '@/utils/auth.util';
import { RedirectType, redirect } from 'next/navigation';

export const revalidate = 0;

export default async function TalkWritePage() {
  const token = Auth.getTokenCookie();
  if (!token) return redirect('/talk/login?next=/talk/write', RedirectType.replace);

  const user = await Auth.verifyToken(token);
  if (!user) return redirect('/talk/login?next=/talk/write', RedirectType.replace);

  const nickname = user.nickname;

  return (
    <DetailsContent>
      <div className="px-24">
        <div className="pb-24 pt-16 lg:mx-auto lg:max-w-screen-lg lg:pt-24">
          <TalkWriteFrame nickname={nickname} />
        </div>
      </div>
    </DetailsContent>
  );
}
