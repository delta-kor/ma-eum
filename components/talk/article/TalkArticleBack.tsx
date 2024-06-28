'use client';

import Icon from '@/components/core/Icon';
import Translate from '@/components/core/Translate';
import useHistory from '@/hooks/history';

export default function TalkArticleBack() {
  const history = useHistory();

  function handleClick() {
    history.back();
  }

  return (
    <div
      onClick={handleClick}
      className="-m-8 flex cursor-pointer items-center gap-12 self-start p-8"
    >
      <Icon type="left" className="w-16 text-gray-200" />
      <div className="text-18 font-500 text-gray-500">
        <Translate>$talk_back_to_articles</Translate>
      </div>
    </div>
  );
}
