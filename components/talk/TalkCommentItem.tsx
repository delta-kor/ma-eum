import Icon from '@/components/core/Icon';
import { TalkCommentMetadata } from '@/services/talk.service';
import { getShortPastRelativeTime } from '@/utils/time.util';

interface Props {
  comment: TalkCommentMetadata;
}

export default function TalkCommentItem({ comment }: Props) {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-8">
          <div className="text-16 font-600 text-primary-500">{comment.nickname}</div>
          <div className="size-4 rounded-full bg-gray-200" />
          <div className="text-14 text-gray-500">
            {getShortPastRelativeTime(comment.date, new Date())}
          </div>
        </div>
        <div className="whitespace-pre-line text-16 font-400 leading-6 text-black">
          {comment.content}
        </div>
      </div>
      <div className="flex items-center gap-8 self-start rounded-8 bg-gray-100 px-12 py-8">
        <Icon type="comment" className="w-14 shrink-0 text-gray-500" />
        <div className="text-14 font-500 text-gray-500">답글 달기</div>
      </div>
    </div>
  );
}
