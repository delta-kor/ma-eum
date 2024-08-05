import TalkArticleContent from '@/components/talk/article/TalkArticleContent';
import TalkArticleHeader from '@/components/talk/article/TalkArticleHeader';
import TalkArticleReact from '@/components/talk/article/TalkArticleReact';
import TalkCommentInput from '@/components/talk/comment/TalkCommentInput';
import TalkCommentList from '@/components/talk/comment/TalkCommentList';
import TalkCommentProvider from '@/providers/TalkCommentProvider';
import { ExtendedTalkArticle } from '@/services/talk.service';
import { TalkUser } from '@prisma/client';

interface Props {
  article: ExtendedTalkArticle;
  user: TalkUser | null;
}

export default function TalkArticleViewer({ article, user }: Props) {
  return (
    <TalkCommentProvider>
      <div className="flex flex-col gap-20">
        <TalkArticleHeader article={article} />
        <div className="h-2 bg-gray-100" />
        <TalkArticleContent article={article} login={!!user} />
        <TalkArticleReact article={article} user={user} />
        <TalkCommentInput articleId={article.id} login={!!user} />
        <TalkCommentList articleId={article.id} userId={user?.id || null} />
      </div>
    </TalkCommentProvider>
  );
}
