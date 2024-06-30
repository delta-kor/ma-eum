import DetailsContent from '@/components/core/header/DetailsContent';
import Title from '@/components/core/header/Title';
import Pc from '@/components/core/responsive/Pc';
import TalkArticleBack from '@/components/talk/article/TalkArticleBack';
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

  const userData = Auth.verifyToken(token);
  const articleData = TalkService.getArticle(articleId);

  const [user, article] = await Promise.all([userData, articleData]);
  if (!user) return redirect('/talk', RedirectType.replace);
  if (!article || article.userId !== user.id) return redirect('/talk', RedirectType.replace);

  const nickname = user.nickname;

  return (
    <DetailsContent>
      <Title>Edit</Title>
      <div className="px-24">
        <div className="pb-24 pt-16 lg:mx-auto lg:max-w-screen-lg lg:pt-24">
          <div className="flex flex-col gap-24">
            <Pc>
              <TalkArticleBack inArticle />
            </Pc>
            <TalkWriteFrame
              edit={{ articleId: article.id, content: article.content, title: article.title }}
              nickname={nickname}
            />
          </div>
        </div>
      </div>
    </DetailsContent>
  );
}
