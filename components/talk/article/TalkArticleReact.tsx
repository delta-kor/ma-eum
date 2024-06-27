import Icon from '@/components/core/Icon';
import TalkArticleDelete from '@/components/talk/article/TalkArticleDelete';
import TalkArticleHeart from '@/components/talk/article/TalkArticleHeart';
import { ExtendedTalkArticle } from '@/services/talk.service';
import { TalkUser } from '@prisma/client';
import Link from 'next/link';

interface Props {
  article: ExtendedTalkArticle;
  user: TalkUser | null;
}

export default function TalkArticleReact({ article, user }: Props) {
  return (
    <div className="flex flex-col gap-16">
      {article.userId === user?.id && (
        <div className="flex items-center gap-24 self-end">
          <Link
            href={`/talk/article/${article.id}/edit`}
            replace
            className="-m-8 flex cursor-pointer items-center gap-8 p-8"
          >
            <Icon type="pencil" className="w-14 shrink-0 text-gray-200" />
            <div className="text-16 font-500 text-gray-500">수정</div>
          </Link>
          <TalkArticleDelete
            articleId={article.id}
            login={!!user}
            className="-m-8 flex cursor-pointer items-center gap-8 p-8"
          >
            <Icon type="trash" className="w-16 shrink-0 text-gray-200" />
            <div className="text-16 font-500 text-gray-500">삭제</div>
          </TalkArticleDelete>
        </div>
      )}
      <div className="flex items-center gap-24">
        <TalkArticleHeart
          articleId={article.id}
          login={!!user}
          className="-m-12 flex cursor-pointer items-center gap-8 p-12"
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
    </div>
  );
}
