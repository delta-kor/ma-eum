import DetailsContent from '@/components/core/header/DetailsContent';
import ChallengeVideoList from '@/components/video/ChallengeVideoList';
import { VideoService } from '@/services/video.service';
import { getSanitizedMember } from '@/utils/member.util';
import MetaUtil from '@/utils/meta.util';
import { SearchParams } from '@/utils/url.util';
import { Metadata } from 'next';

export const revalidate = 0;

interface Props {
  searchParams: SearchParams;
}

export default async function ChallengeVideosPage({ searchParams }: Props) {
  const member = getSanitizedMember(searchParams.member || null);
  const videosData = VideoService.getChallengeVideos(member, { cursor: null, limit: 20 });

  const [videos] = await Promise.all([videosData]);

  return (
    <DetailsContent>
      <ChallengeVideoList preloadedVideos={videos} />
    </DetailsContent>
  );
}

export function generateMetadata(): Metadata {
  return MetaUtil.getSubpage(
    'Challenge',
    'Watch challenge videos of CSR(첫사랑).',
    '/videos/challenge'
  );
}
