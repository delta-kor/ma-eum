import { Session } from '@prisma/client';
import { format } from 'date-fns';

interface Props {
  session: Session;
}

export default function SessionVideoList({ session }: Props) {
  return (
    <div className="rounded-16 bg-primary-100 p-16">
      <div className="flex items-center justify-between">
        <div className="text-18 font-600 text-black">{session.program}</div>
        <div className="text-14 font-600 text-gray-500">{format(session.date, 'yy. MM. dd')}</div>
      </div>
    </div>
  );
}
