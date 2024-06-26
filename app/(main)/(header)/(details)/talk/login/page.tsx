import DetailsContent from '@/components/core/header/DetailsContent';
import TalkLoginPageFrame from '@/components/talk/TalkLoginPageFrame';

export const revalidate = 0;

export default function TalkLoginPage() {
  return (
    <DetailsContent>
      <div className="px-24">
        <div className="pb-24 pt-16 lg:mx-auto lg:max-w-screen-lg lg:pt-24">
          <TalkLoginPageFrame />
        </div>
      </div>
    </DetailsContent>
  );
}
