'use client';

import Icon from '@/components/core/Icon';
import Translate from '@/components/core/Translate';
import useHistory from '@/hooks/history';
import { useRouter } from 'next/navigation';

interface Props {
  inArticle?: boolean;
}

export default function TalkArticleBack({ inArticle }: Props) {
  const history = useHistory();
  const router = useRouter();

  function handleClick() {
    const previousUrl = history.getPreviousUrl();
    if (!previousUrl.startsWith('/talk')) router.push('/talk');
    else history.back();
  }

  return (
    <div onClick={handleClick} className="-m-8 flex cursor-pointer items-center gap-12 p-8">
      <Icon type="left" className="w-16 text-gray-200" />
      <div className="text-18 font-500 text-gray-500">
        <Translate>{inArticle ? '$talk_back_to_article' : '$talk_back_to_articles'}</Translate>
      </div>
    </div>
  );
}
