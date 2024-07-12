import DetailsContent from '@/components/core/header/DetailsContent';
import CoverVideoList from '@/components/video/CoverVideoList';
import { VideoService } from '@/services/video.service';
import { getSanitizedMember } from '@/utils/member.util';
import MetaUtil from '@/utils/meta.util';
import { SearchParams } from '@/utils/url.util';
import { Metadata } from 'next';

export const revalidate = 0;

interface Props {
  searchParams: SearchParams;
}

export default async function CoverVideosPage({ searchParams }: Props) {
  const videosData = VideoService.getCoverVideos(getSanitizedMember(searchParams.member || null));
  const [videos] = await Promise.all([videosData]);

  return (
    <DetailsContent>
      <CoverVideoList preloadedVideos={videos} />
    </DetailsContent>
  );
}

export function generateMetadata(): Metadata {
  return MetaUtil.getSubpage(
    'Cover',
    'Watch vocal & dance cover videos of CSR(첫사랑).',
    '/videos/cover'
  );
}
