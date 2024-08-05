import Adsense from '@/components/core/ad/Adsense';
import UrlHighlighter from '@/components/talk/UrlHighlighter';
import TalkArticlePoll from '@/components/talk/article/TalkArticlePoll';
import { ExtendedTalkArticle } from '@/services/talk.service';

interface Props {
  article: ExtendedTalkArticle;
  login: boolean;
}

export default function TalkArticleContent({ article, login }: Props) {
  return (
    <div className="flex min-h-[240px] flex-col gap-16">
      <div className="whitespace-pre-line break-words text-16 font-400 leading-6 text-black">
        <UrlHighlighter>{article.content}</UrlHighlighter>
      </div>
      <TalkArticlePoll login={login} pollId={article.pollId} />
      <Adsense />
    </div>
  );
}
