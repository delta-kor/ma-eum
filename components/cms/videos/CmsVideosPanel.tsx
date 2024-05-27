'use client';

import { importYoutubeVideosFromJson } from '@/actions/cms/videos';
import { revalidate } from '@/actions/revalidate';
import CmsButton from '@/components/cms/CmsButton';
import CmsVideosInfo, { VideoExtended } from '@/components/cms/videos/CmsVideosInfo';
import { Category } from '@prisma/client';
import { format } from 'date-fns';
import { useState } from 'react';

interface Props {
  categories: Category[];
  videos: VideoExtended[];
}

export default function CmsVideosPanel({ categories, videos }: Props) {
  const [selectedVideoId, setSelectedVideoId] = useState<null | string>(null);
  const selectedVideo = videos.find(video => video.id === selectedVideoId) || null;

  async function handleImportJson() {
    const data = prompt('Paste the json data');
    if (!data) return;

    try {
      const json = JSON.parse(data);
      await importYoutubeVideosFromJson(json);
      alert('Imported successfully');
      await revalidate('/cms/videos');
    } catch (error) {
      alert('Invalid json data');
    }
  }

  async function handleVideoClick(video: VideoExtended) {
    setSelectedVideoId(video.id);
  }

  async function handleRefresh() {
    await revalidate('/cms/videos');
  }

  return (
    <div className="flex flex-col gap-16">
      <div className="flex items-center justify-between">
        <div className="text-20">
          Total <span className="font-700 text-primary-500">{videos.length}</span> item(s)
        </div>
        <div className="flex gap-12">
          <CmsButton onClick={handleImportJson}>Import Json</CmsButton>
          <CmsButton onClick={handleRefresh}>Refresh</CmsButton>
        </div>
      </div>
      <div style={{ height: 'calc(100vh - 200px)' }} className="flex gap-12">
        <div className="flex grow flex-col overflow-y-scroll">
          {videos.map(video => (
            <div
              key={video.id}
              onClick={() => handleVideoClick(video)}
              className="flex cursor-pointer items-center gap-16 rounded-8 px-18 py-8 text-18 hover:bg-gray-100"
            >
              <div className="code text-14 text-gray-500">{video.id}</div>
              <div className="code text-14 text-primary-500">{format(video.date, 'yyMMdd')}</div>
              {video.categories.length > 0 && (
                <div className="flex gap-4">
                  {video.categories.map(category => (
                    <div
                      key={category.id}
                      className="code rounded-4 bg-black px-6 py-2 text-12 text-white"
                    >
                      {category.title}
                    </div>
                  ))}
                </div>
              )}
              <div className="grow text-14 text-black">{video.title}</div>
              <div className="code text-14 text-gray-500">
                {video.meta.map(item => item.type).join(', ')}
              </div>
              <div className="code text-14 text-gray-500">{video.source}</div>
            </div>
          ))}
        </div>
        <div className="w-[1px] self-stretch bg-gray-100" />
        <div className="scrollbar-hide w-[280px] shrink-0 overflow-y-scroll pb-24">
          <CmsVideosInfo categories={categories} selectedVideo={selectedVideo} />
        </div>
      </div>
    </div>
  );
}
