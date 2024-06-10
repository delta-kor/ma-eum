import GradientIcon from '@/components/core/GradientIcon';
import Translate from '@/components/core/Translate';
import SessionVideoItem from '@/components/video/SessionVideoItem';
import { ExtendedSession } from '@/services/session.service';
import { getSessionTitle } from '@/utils/session.util';
import { format } from 'date-fns';

interface Props {
  session: ExtendedSession;
}

export default function SessionVideoList({ session }: Props) {
  const videos = session.videos;

  return (
    <div className="flex flex-col gap-12 rounded-16 bg-primary-100 p-16">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <GradientIcon type="live" className="w-20" />
          <div className="text-18 font-600 text-black">
            <Translate>{getSessionTitle(session)}</Translate>
          </div>
        </div>
        <div className="text-14 font-600 text-gray-500">{format(session.date, 'yy. MM. dd')}</div>
      </div>
      <div className="grid grid-cols-2 flex-col gap-8 md:grid-cols-3 lg:grid-cols-2">
        {videos.map(video => (
          <SessionVideoItem key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}

export function SessionVideoListPlaceholder() {
  return <div className="h-[129px] animate-pulse rounded-16 bg-primary-100" />;
}
