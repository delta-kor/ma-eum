import DetailsContent from '@/components/core/header/DetailsContent';
import Title from '@/components/core/header/Title';
import TalkArticleViewer from '@/components/talk/TalkArticleViewer';
import { TalkService } from '@/services/talk.service';
import { notFound } from 'next/navigation';

export const revalidate = 0;

interface Props {
  params: {
    articleId: string;
  };
}

export default async function TalkViewPage({ params: { articleId } }: Props) {
  const articleData = TalkService.getArticle(articleId);

  const [article] = await Promise.all([articleData]);
  if (!article) return notFound();

  return (
    <DetailsContent>
      <Title>Talk</Title>
      <div className="px-24">
        <div className="pb-24 pt-16 lg:mx-auto lg:max-w-screen-lg lg:pt-24">
          <TalkArticleViewer article={article} />
        </div>
      </div>
    </DetailsContent>
  );
}
