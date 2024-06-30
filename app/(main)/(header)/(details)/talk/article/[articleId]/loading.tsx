import DetailsContent from '@/components/core/header/DetailsContent';
import Title from '@/components/core/header/Title';
import Pc from '@/components/core/responsive/Pc';
import TalkArticleBack from '@/components/talk/article/TalkArticleBack';

export default function TalkViewLoading() {
  return (
    <DetailsContent>
      <Title>Talk</Title>
      <div className="px-24">
        <div className="pb-24 pt-16 lg:mx-auto lg:max-w-screen-lg lg:pt-24">
          <div className="flex flex-col gap-16">
            <Pc>
              <TalkArticleBack />
            </Pc>
            <div className="flex animate-pulse flex-col gap-20">
              <div className="flex flex-col gap-8">
                <div className="h-[29px] w-full max-w-[512px] rounded-4 bg-gray-100" />
                <div className="flex items-center gap-16">
                  <div className="h-[19px] w-64 rounded-4 bg-gray-100" />
                  <div className="h-[17px] w-[108px] rounded-4 bg-gray-100" />
                </div>
              </div>
              <div className="h-2 bg-gray-100" />
              <div className="flex min-h-[240px] flex-col gap-8">
                <div className="h-[19px] w-full max-w-[628px] rounded-4  bg-gray-50" />
                <div className="h-[19px] w-full max-w-[628px] rounded-4 bg-gray-50" />
                <div className="h-[19px] w-3/5 max-w-[480px] rounded-4 bg-gray-50" />
                <div className="h-[19px] w-1/5 max-w-[240px] rounded-4 bg-gray-50" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DetailsContent>
  );
}
