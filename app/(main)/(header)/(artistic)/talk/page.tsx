import { TalkService } from '@/services/talk.service';

export const revalidate = 60;

export default async function TalkPage() {
  const articlesMetadataData = TalkService.getArticlesMetadata({ cursor: null, limit: 10 });
  const [articlesMetadata] = await Promise.all([articlesMetadataData]);

  return (
    <div className="px-24 pb-24">
      <div className="mx-auto mt-artistic-header-height-md w-full max-w-screen-lg lg:mt-artistic-header-height-lg lg:pt-32"></div>
    </div>
  );
}
