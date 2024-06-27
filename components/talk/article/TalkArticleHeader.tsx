import { ExtendedTalkArticle } from '@/services/talk.service';
import { DateTime } from 'luxon';

interface Props {
  article: ExtendedTalkArticle;
}

export default function TalkArticleHeader({ article }: Props) {
  const date = DateTime.fromJSDate(article.date, { zone: 'Asia/Seoul' });

  return (
    <div className="flex flex-col gap-8">
      <div className="text-24 font-700 text-black">{article.title}</div>
      <div className="flex items-center gap-16">
        <div className="truncate text-16 font-500 text-gray-500">{article.user.nickname}</div>
        <div className="shrink-0 text-14 font-500 text-gray-200">
          {date.toFormat('yy. MM. dd. HH:mm')}
        </div>
      </div>
    </div>
  );
}
