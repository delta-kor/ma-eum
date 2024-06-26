'use client';

import TalkCommentItem from '@/components/talk/TalkCommentItem';
import { trpc } from '@/hooks/trpc';
import { TalkCommentContext } from '@/providers/TalkCommentProvider';
import { useContext, useEffect } from 'react';

interface Props {
  articleId: string;
}

export default function TalkCommentList({ articleId }: Props) {
  const talkCommentContext = useContext(TalkCommentContext);
  const comments = trpc.talk.getArticleComments.useQuery(
    {
      articleId,
    },
    {
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    }
  );

  const items = comments.data || [];

  useEffect(() => {
    talkCommentContext.setCallback(comments.refetch);
  }, []);

  return (
    <div className="flex flex-col gap-32">
      {items.map(comment => (
        <TalkCommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
