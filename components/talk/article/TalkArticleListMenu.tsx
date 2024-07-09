import Icon from '@/components/core/Icon';
import Translate from '@/components/core/Translate';
import TalkArticleSortMenu from '@/components/talk/article/TalkArticleSortMenu';
import TalkWriteButton from '@/components/talk/write/TalkWriteButton';
import { TalkUser } from '@prisma/client';

interface Props {
  user: TalkUser | null;
}

export default function TalkArticleListMenu({ user }: Props) {
  return (
    <div className="flex items-center justify-between">
      <TalkWriteButton login={!!user} />
      <TalkArticleSortMenu />
    </div>
  );
}

export function TalkArticleListMenuPlaceholder() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex cursor-pointer items-center gap-8 rounded-8 bg-gradient-primary px-16 py-8">
        <Icon type="pencil" className="w-14 shrink-0 text-white" />
        <div className="text-16 font-600 text-white">
          <Translate>$write_article</Translate>
        </div>
      </div>
    </div>
  );
}
