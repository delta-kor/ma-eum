import DetailsContent from '@/components/core/header/DetailsContent';
import CoverVideoList from '@/components/video/CoverVideoList';
import { VideoService } from '@/services/video.service';
import MetaUtil from '@/utils/meta.util';
import { Metadata } from 'next';

export const revalidate = 3600;

export default async function CoverVideosPage() {
  const videosData = VideoService.getCoverVideos(null);

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
