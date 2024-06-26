import TalkArticleContent from '@/components/talk/TalkArticleContent';
import TalkArticleHeader from '@/components/talk/TalkArticleHeader';
import TalkArticleReact from '@/components/talk/TalkArticleReact';
import { ExtendedTalkArticle } from '@/services/talk.service';
import { TalkUser } from '@prisma/client';

interface Props {
  article: ExtendedTalkArticle;
  user: TalkUser | null;
}

export default function TalkArticleViewer({ article, user }: Props) {
  return (
    <div className="flex flex-col gap-20">
      <TalkArticleHeader article={article} />
      <div className="h-2 bg-gray-100" />
      <TalkArticleContent article={article} />
      <TalkArticleReact article={article} user={user} />
    </div>
  );
}
