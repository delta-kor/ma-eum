import TalkWriteButton from '@/components/talk/write/TalkWriteButton';
import { TalkUser } from '@prisma/client';

interface Props {
  user: TalkUser | null;
}

export default function TalkArticleListMenu({ user }: Props) {
  return (
    <div className="flex items-center justify-between">
      <TalkWriteButton login={!!user} />
    </div>
  );
}
