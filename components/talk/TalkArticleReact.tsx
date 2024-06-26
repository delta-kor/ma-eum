import Icon from '@/components/core/Icon';
import TalkArticleHeart from '@/components/talk/TalkArticleHeart';
import { ExtendedTalkArticle } from '@/services/talk.service';
import { TalkUser } from '@prisma/client';

interface Props {
  article: ExtendedTalkArticle;
  user: TalkUser | null;
}

export default function TalkArticleReact({ article, user }: Props) {
  return (
    <div className="flex items-center gap-24">
      <TalkArticleHeart
        articleId={article.id}
        login={!!user}
        className="flex cursor-pointer items-center gap-8"
      >
        <Icon
          data-active={user && article.likedUsers.some(likedUser => likedUser.id === user.id)}
          type="heart"
          className="w-18 shrink-0 text-gray-200 data-[active=true]:text-c-red"
        />
        <div className="text-18 font-500 text-gray-500">{article.likedUsers.length}</div>
      </TalkArticleHeart>
      <div className="flex items-center gap-8">
        <Icon
          data-active={user && article.comments.some(comment => comment.userId === user.id)}
          type="comment"
          className="w-18 shrink-0 text-gray-200 data-[active=true]:text-primary-500"
        />
        <div className="text-18 font-500 text-gray-500">{article.comments.length}</div>
      </div>
    </div>
  );
}
