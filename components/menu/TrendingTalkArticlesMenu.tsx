import Link from 'next/link';

export default function TrendingTalkArticlesMenu() {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex items-center gap-8">
        <div className="shrink-0 text-18 font-700 text-black">MAEUM TALK</div>
        <div className="grow text-18 font-600 text-primary-500">인기글</div>
        <Link href={`/talk`} className="shrink-0 text-16 font-500 text-gray-500">
          전체보기
        </Link>
      </div>
    </div>
  );
}
