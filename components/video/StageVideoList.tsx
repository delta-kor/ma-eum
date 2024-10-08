'use client';

import NoItems from '@/components/core/NoItems';
import Translate from '@/components/core/Translate';
import MemberMenu from '@/components/menu/MemberMenu';
import SessionVideoList, { SessionVideoListPlaceholder } from '@/components/video/SessionVideoList';
import useQuery from '@/hooks/query';
import { trpc } from '@/hooks/trpc';
import { PerformanceMusicContext } from '@/providers/PerformanceMusicProvider';
import { Member, getSanitizedMember } from '@/utils/member.util';
import { useContext, useState } from 'react';

interface Props {
  attached?: boolean;
}

export default function StageVideoList({ attached }: Props) {
  const query = useQuery();
  const initialMember = getSanitizedMember(query.get('member'));
  const [member, setMember] = useState<Member | null>(initialMember);

  const selectedMusic = useContext(PerformanceMusicContext);
  const selectedMusicId = selectedMusic?.id;

  const sessions = trpc.session.getSessionsByMusicId.useQuery(
    {
      member,
      musicId: selectedMusicId!,
    },
    {
      enabled: !!selectedMusicId,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  );

  function handleMemberSelect(member: Member | null) {
    setMember(member);
  }

  const items = sessions.data;
  const isLoading = sessions.isFetching;

  if (!isLoading && items && !items.length && member === initialMember) return null;

  return (
    <div className="flex flex-col gap-12">
      {!attached && (
        <div className="text-20 font-700 text-black">
          <Translate>$stages</Translate>
        </div>
      )}
      <div className="flex flex-col items-start gap-18 lg:grid lg:max-w-screen-lgx lg:grid-cols-[160px_1fr] lg:items-start">
        <div className="-mx-24 min-w-0 self-stretch lg:m-0 lg:grow">
          <MemberMenu selected={member} onSelect={handleMemberSelect} />
        </div>
        <div className="flex flex-col gap-16 self-stretch lg:grid lg:grid-cols-2 lg:self-start">
          {isLoading || !items ? (
            <>
              <SessionVideoListPlaceholder />
              <SessionVideoListPlaceholder />
              <SessionVideoListPlaceholder />
              <SessionVideoListPlaceholder />
              <SessionVideoListPlaceholder />
              <SessionVideoListPlaceholder />
            </>
          ) : items.length > 0 ? (
            items.map(session => <SessionVideoList key={session.id} session={session} />)
          ) : (
            <div className="lg:col-span-2">
              <NoItems />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
