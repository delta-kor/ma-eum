import Icon from '@/components/core/Icon';
import VideoBack from '@/components/video/player/VideoBack';
import { VideoPlayerPlaceholder } from '@/components/video/player/VideoPlayer';

export default function VideoLoading() {
  return (
    <div className="animate-pulse px-24 pb-24 lg:mt-artistic-header-height-lg lg:pt-16">
      <div className="flex flex-col gap-16 lg:mx-auto lg:grid lg:max-w-screen-xl lg:grid-cols-[1fr_360px] lg:justify-center">
        <div className="self-stretch">
          <div className="flex flex-col gap-16 lg:sticky lg:left-0 lg:top-[84px]">
            <div className="-mx-24 lg:mx-0 lg:hidden">
              <VideoPlayerPlaceholder shorts={false} />
            </div>
            <div className="fixed left-0 top-0 z-10 w-full lg:static">
              <div className="group aspect-video-full w-full lg:!max-h-none">
                <div className="size-full bg-gray-100 lg:!max-h-none" />
              </div>
            </div>
            <div className="flex flex-col gap-16">
              <div className="flex items-center gap-16">
                <VideoBack />
                <div className="flex w-full flex-col gap-8">
                  <div className="h-[21px] w-full rounded-4 bg-gray-100 lg:h-24" />
                  <div className="flex items-center gap-8">
                    <Icon type="calendar" className="w-18 shrink-0 text-gray-500" />
                    <div className="h-[19px] w-[96px] rounded-4 bg-gray-100" />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex h-[35px] w-[109px] shrink-0 items-center gap-8 rounded-8 bg-gray-100 px-12 py-8"></div>
                <div className="shrink-0 p-10">
                  <Icon type="share" className="w-16 text-gray-200" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-16">
          <div className="h-64 rounded-16 bg-gray-50" />
          <div className="h-64 rounded-16 bg-gray-50" />
          <div className="h-64 rounded-16 bg-gray-50" />
          <div className="h-64 rounded-16 bg-gray-50" />
        </div>
      </div>
    </div>
  );
}
