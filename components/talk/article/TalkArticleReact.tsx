import Icon from '@/components/core/Icon';
import Translate from '@/components/core/Translate';
import TalkArticleDelete from '@/components/talk/article/TalkArticleDelete';
import TalkArticleHeart from '@/components/talk/article/TalkArticleHeart';
import TalkArticleReport from '@/components/talk/article/TalkArticleReport';
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
      <div className="flex items-center gap-24 self-end">
        {article.userId === user?.id ? (
          <>
            <Link
              href={`/talk/article/${article.id}/edit`}
              className="jelly select:bg-gray-50 -mx-12 -my-8 flex cursor-pointer items-center gap-8 rounded-8 px-12 py-8 hover:bg-gray-50 selected:bg-gray-50"
            >
              <Icon type="pencil" className="w-14 shrink-0 text-gray-200" />
              <div className="text-16 font-500 text-gray-500">
                <Translate>$talk_article_edit</Translate>
              </div>
            </Link>
            <TalkArticleDelete
              articleId={article.id}
              login={!!user}
              className="jelly select:bg-gray-50 -mx-12 -my-8 flex cursor-pointer items-center gap-8 rounded-8 px-12 py-8 hover:bg-gray-50 selected:bg-gray-50"
            >
              <Icon type="trash" className="w-16 shrink-0 text-gray-200" />
              <div className="text-16 font-500 text-gray-500">
                <Translate>$talk_article_delete</Translate>
              </div>
            </TalkArticleDelete>
          </>
        ) : (
          <TalkArticleReport
            articleId={article.id}
            login={!!user}
            className="jelly select:bg-gray-50 -mx-12 -my-8 flex cursor-pointer items-center gap-8 rounded-8 px-12 py-8 hover:bg-gray-50 selected:bg-gray-50"
          >
            <Icon type="flag" className="w-16 shrink-0 text-gray-200" />
            <div className="text-16 font-500 text-gray-500">
              <Translate>$talk_article_report</Translate>
            </div>
          </TalkArticleReport>
        )}
      </div>
      <div className="flex items-center gap-24">
        <div className="flex items-center gap-8">
          <Icon
            data-active={user && article.comments.some(comment => comment.userId === user.id)}
            type="comment"
            className="w-18 shrink-0 text-gray-200 data-[active=true]:text-primary-500"
          />
          <div className="text-18 font-500 text-gray-500">{article.comments.length}</div>
        </div>
        <TalkArticleHeart
          articleId={article.id}
          login={!!user}
          className="group -m-12 box-content flex cursor-pointer items-center gap-8 p-12"
        >
          <Icon
            data-active={user && article.likedUsers.some(likedUser => likedUser.id === user.id)}
            type="heart"
            className="w-18 shrink-0 text-gray-200 transition-colors group-hover:text-c-red/30 data-[active=true]:!text-c-red"
          />
          <div className="text-18 font-500 text-gray-500 group-data-[loading=true]:hidden">
            {article.likedUsers.length}
          </div>
          <Icon
            type="spinner"
            className="hidden w-16 animate-spin text-gray-500 group-data-[loading=true]:block"
          />
        </TalkArticleHeart>
      </div>
    </div>
  );
}
