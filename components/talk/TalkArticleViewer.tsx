import TalkArticleContent from '@/components/talk/TalkArticleContent';
import TalkArticleHeader from '@/components/talk/TalkArticleHeader';
import { ExtendedTalkArticle } from '@/services/talk.service';

interface Props {
  article: ExtendedTalkArticle;
}

export default function TalkArticleViewer({ article }: Props) {
  return (
    <div className="flex flex-col gap-20">
      <TalkArticleHeader article={article} />
      <div className="h-2 bg-gray-100" />
      <TalkArticleContent article={article} />
    </div>
  );
}
