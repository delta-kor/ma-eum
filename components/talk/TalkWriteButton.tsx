import Icon from '@/components/core/Icon';
import Translate from '@/components/core/Translate';
import Link from 'next/link';

export default function TalkWriteButton() {
  return (
    <Link
      href={`/talk/write`}
      className="flex items-center gap-8 rounded-8 bg-gradient-primary px-16 py-8"
    >
      <Icon type="pencil" className="w-14 shrink-0 text-white" />
      <div className="text-16 font-600 text-white">
        <Translate>$write_article</Translate>
      </div>
    </Link>
  );
}
