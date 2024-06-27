import Icon from '@/components/core/Icon';
import Translate from '@/components/core/Translate';
import TalkCommentInput from '@/components/talk/comment/TalkCommentInput';
import { TalkCommentMetadata } from '@/services/talk.service';
import { getShortPastRelativeTime } from '@/utils/time.util';
import { useState } from 'react';

interface Props {
  articleId: string;
  comment: TalkCommentMetadata;
  reply?: boolean;
  userId: null | string;
}

export default function TalkCommentItem({ articleId, comment, reply, userId }: Props) {
  const [isReplying, setIsReplying] = useState(false);

  function handleReplyOpen() {
    setIsReplying(true);
  }

  function handleReplyClose() {
    setIsReplying(false);
  }

  function handleReplySubmit() {
    setIsReplying(false);
  }

  const hasReplies = comment.replies.length > 0;
  const isMyComment = userId === comment.userId;

  return (
    <div className="flex flex-col gap-12">
      <div className="flex items-start gap-16">
        <div className="flex min-w-0 grow flex-col gap-4">
          <div className="flex items-center gap-8 self-stretch">
            <div className="truncate text-14 font-600 text-primary-500">{comment.nickname}</div>
            <div className="size-4 shrink-0 rounded-full bg-gray-200" />
            <div className="shrink-0 text-14 text-gray-500">
              {getShortPastRelativeTime(comment.date, new Date())}
            </div>
          </div>
          <div className="whitespace-pre-line text-16 font-400 leading-6 text-black">
            {comment.content}
          </div>
        </div>
        {isMyComment && (
          <div className="flex items-center gap-8">
            <div className="flex items-center self-end">
              <div className="cursor-pointer p-8">
                <Icon type="pencil" className="w-14 shrink-0 text-gray-200" />
              </div>
              <div className="cursor-pointer p-8">
                <Icon type="trash" className="w-16 shrink-0 text-gray-200" />
              </div>
            </div>
          </div>
        )}
      </div>
      {!reply &&
        (isReplying ? (
          <div
            onClick={handleReplyClose}
            className="flex cursor-pointer items-center gap-8 self-start rounded-8 bg-gray-100 px-12 py-8"
          >
            <Icon type="close" className="w-10 shrink-0 text-gray-500" />
            <div className="select-none text-14 font-500 text-gray-500">
              <Translate>$talk_comment_reply_cancel</Translate>
            </div>
          </div>
        ) : (
          <div
            onClick={handleReplyOpen}
            className="flex cursor-pointer items-center gap-8 self-start rounded-8 bg-gray-100 px-12 py-8"
          >
            <Icon type="comment" className="w-14 shrink-0 text-gray-500" />
            <div className="select-none text-14 font-500 text-gray-500">
              <Translate>$talk_comment_reply</Translate>
            </div>
          </div>
        ))}
      {(hasReplies || isReplying) && (
        <div className="mt-8 flex gap-16 pl-16">
          <div className="w-2 bg-gray-100" />
          <div className="flex min-w-0 grow flex-col gap-16">
            {isReplying && (
              <TalkCommentInput
                articleId={articleId}
                commentId={comment.id}
                login={!!userId}
                onSubmit={handleReplySubmit}
              />
            )}
            {comment.replies.map(reply => (
              <TalkCommentItem
                key={reply.id}
                articleId={articleId}
                comment={reply}
                userId={userId}
                reply
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
