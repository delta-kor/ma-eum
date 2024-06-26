'use client';

import Icon from '@/components/core/Icon';
import useHistory from '@/hooks/history';
import useTitle from '@/hooks/title';
import { usePathname } from 'next/navigation';

export default function DetailsHeader() {
  const pathname = usePathname();
  const history = useHistory();
  const { content } = useTitle();

  function handleBackClick() {
    history.back();
  }

  let title: string;
  switch (pathname) {
    case '/videos':
      title = 'Videos';
      break;
    case '/musics':
      title = 'Musics';
      break;
    case '/photocards':
      title = 'Photocards';
      break;
    case '/videos/cover':
      title = 'Cover';
      break;
    case '/videos/challenge':
      title = 'Challenge';
      break;
    case '/videos/live':
      title = 'Live';
      break;
    case '/videos/shorts':
      title = 'Shorts';
      break;
    case '/schedules':
      title = 'Calendar';
      break;
    case '/talk/write':
      title = 'Write';
      break;
    case '/talk/login':
      title = 'Login';
      break;
    default:
      title = content || '';
  }

  return (
    <div className="fixed left-0 top-0 z-20 h-details-header-height w-full bg-white py-16">
      <div className="absolute h-24 w-full lg:left-1/2 lg:max-w-screen-lgx lg:-translate-x-1/2">
        <div
          onClick={handleBackClick}
          className="absolute left-16 top-1/2 -translate-y-1/2 cursor-pointer p-8"
        >
          <Icon type="left" className="w-16 text-gray-200" />
        </div>
        <div className="text-center text-20 font-700 text-black">{title}</div>
      </div>
    </div>
  );
}
