import Adfit from '@/components/core/ad/Adfit';
import { ExtendedTalkArticle } from '@/services/talk.service';

interface Props {
  article: ExtendedTalkArticle;
}

export default function TalkArticleContent({ article }: Props) {
  return (
    <div className="flex min-h-[240px] flex-col gap-16">
      <div className="whitespace-pre-line text-16 font-400 leading-6 text-black">
        {article.content}
      </div>
      <Adfit unit="DAN-95IhK8vqv2fMwbcl" width="300" height="250" />
    </div>
  );
}
