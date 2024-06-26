import { ExtendedTalkArticle } from '@/services/talk.service';

interface Props {
  article: ExtendedTalkArticle;
}

export default function TalkArticleContent({ article }: Props) {
  return (
    <div className="whitespace-pre-line text-16 font-500 leading-6 text-black">
      {article.content}
    </div>
  );
}
