import DetailsContent from '@/components/core/header/DetailsContent';
import TalkWriteFrame from '@/components/talk/write/TalkWriteFrame';
import { TalkService } from '@/services/talk.service';
import Auth from '@/utils/auth.util';
import { RedirectType, redirect } from 'next/navigation';

export const revalidate = 0;

interface Props {
  params: {
    articleId: string;
  };
}

export default async function TalkEditPage({ params: { articleId } }: Props) {
  const token = Auth.getTokenCookie();
  if (!token) return redirect('/talk', RedirectType.replace);

  const user = await Auth.verifyToken(token);
  if (!user) return redirect('/talk', RedirectType.replace);

  const article = await TalkService.getArticle(articleId);
  if (!article || article.userId !== user.id) return redirect('/talk', RedirectType.replace);

  const nickname = user.nickname;

  return (
    <DetailsContent>
      <div className="px-24">
        <div className="pb-24 pt-16 lg:mx-auto lg:max-w-screen-lg lg:pt-24">
          <TalkWriteFrame
            edit={{ articleId: article.id, content: article.content, title: article.title }}
            nickname={nickname}
          />
        </div>
      </div>
    </DetailsContent>
  );
}
