import DetailsContent from '@/components/core/header/DetailsContent';
import Title from '@/components/core/header/Title';
import TalkArticleViewer from '@/components/talk/TalkArticleViewer';
import { TalkService } from '@/services/talk.service';
import Auth from '@/utils/auth.util';
import { notFound } from 'next/navigation';

export const revalidate = 0;

interface Props {
  params: {
    articleId: string;
  };
}

export default async function TalkViewPage({ params: { articleId } }: Props) {
  const token = Auth.getTokenCookie();

  const articleData = TalkService.getArticle(articleId);
  const userData = token ? Auth.verifyToken(token) : null;

  const [article, user] = await Promise.all([articleData, userData]);
  if (!article) return notFound();

  return (
    <DetailsContent>
      <Title>Talk</Title>
      <div className="px-24">
        <div className="pb-24 pt-16 lg:mx-auto lg:max-w-screen-lg lg:pt-24">
          <TalkArticleViewer article={article} user={user} />
        </div>
      </div>
    </DetailsContent>
  );
}
