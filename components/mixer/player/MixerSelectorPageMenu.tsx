import Icon from '@/components/core/Icon';
import { ExtendedSession } from '@/services/session.service';
import { getSessionTitle } from '@/utils/session.util';
import { format } from 'date-fns';

interface Props {
  session: ExtendedSession;
  onChange: (direction: number) => void;
}

export default function MixerSelectorPageMenu({ session, onChange }: Props) {
  const title = getSessionTitle(session);
  const date = format(session.date, 'yyMMdd');

  return (
    <div className="flex min-w-0 items-center justify-between">
      <div onClick={() => onChange(-1)} className="-m-16 shrink-0 cursor-pointer p-16">
        <Icon type="left" className="w-16 text-gray-200" />
      </div>
      <div className="flex min-w-0 grow flex-col gap-4">
        <div className="select-none truncate text-center text-16 font-500 text-gray-500">
          {date}
        </div>
        <div className="select-none truncate text-center text-18 font-600 text-black">{title}</div>
      </div>
      <div onClick={() => onChange(1)} className="-m-16 shrink-0 cursor-pointer p-16">
        <Icon type="right" className="w-16 text-gray-200" />
      </div>
    </div>
  );
}
