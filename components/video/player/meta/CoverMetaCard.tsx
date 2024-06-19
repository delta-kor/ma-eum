import Icon from '@/components/core/Icon';
import MotionWrapper from '@/components/video/player/MotionWrapper';
import { CoverVideoMeta } from '@/utils/video.util';
import Link from 'next/link';

interface Props {
  coverMeta: CoverVideoMeta;
}

export default function CoverMetaCard({ coverMeta }: Props) {
  const title = coverMeta.title;
  const kind = coverMeta.kind;
  const kindText = kind === 'dance' ? 'Dance Cover' : 'Vocal Cover';

  return (
    <MotionWrapper layoutId="cover-meta-card">
      <Link
        data-kind={kind}
        href={`/videos/cover`}
        className="flex items-center gap-16 rounded-16 bg-gradient-primary px-24 py-16 data-[kind=dance]:bg-gradient-red"
      >
        <div className="flex min-w-0 grow flex-col gap-4">
          <div className="line-clamp-2 text-20 font-700 text-white">{title}</div>
          <div className="text-16 font-500 text-white opacity-70">{kindText}</div>
        </div>
        <Icon type="music" className="w-20 shrink-0 text-white/30" />
      </Link>
    </MotionWrapper>
  );
}
