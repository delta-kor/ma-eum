import { TalkArticleListPlaceholder } from '@/components/talk/article/TalkArticleList';
import { TalkArticleListMenuPlaceholder } from '@/components/talk/article/TalkArticleListMenu';

export default function TalkLoading() {
  return (
    <div className="px-24 pb-24">
      <div className="mx-auto mt-artistic-header-height-md w-full max-w-screen-lg lg:mt-artistic-header-height-lg lg:pt-32">
        <div className="flex flex-col gap-16">
          <TalkArticleListMenuPlaceholder />
          <TalkArticleListPlaceholder />
        </div>
      </div>
    </div>
  );
}
