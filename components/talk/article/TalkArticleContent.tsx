import Adsense from '@/components/core/ad/Adsense';
import UrlHighlighter from '@/components/talk/UrlHighlighter';
import { ExtendedTalkArticle } from '@/services/talk.service';

interface Props {
  article: ExtendedTalkArticle;
}

export default function TalkArticleContent({ article }: Props) {
  return (
    <div className="flex min-h-[240px] flex-col gap-16">
      <div className="whitespace-pre-line break-words text-16 font-400 leading-6 text-black">
        <UrlHighlighter>{article.content}</UrlHighlighter>
      </div>
      <Adsense />
    </div>
  );
}
