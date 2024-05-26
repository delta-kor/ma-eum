'use client';

import { addCategoryToVideo, removeCategoryFromVideo } from '@/actions/cms/videos';
import { revalidate } from '@/actions/revalidate';
import Modal from '@/components/cms/CmsModal';
import { Category, Video, VideoSource } from '@prisma/client';
import { format } from 'date-fns';
import { useState } from 'react';

export type VideoExtended = { categories: Category[] } & Video;

interface Props {
  categories: Category[];
  selectedVideo: VideoExtended | null;
}

export default function CmsVideosInfo({ categories, selectedVideo }: Props) {
  const [categoryModalActive, setCategoryModalActive] = useState(false);

  async function handleCategoryAdd(category: Category) {
    try {
      setCategoryModalActive(false);
      await addCategoryToVideo(selectedVideo!.id, category.id);
      await revalidate('/cms/videos');
    } catch (e) {
      console.error(e);
      alert(e);
    }
  }

  async function handleCategoryRemove(category: Category) {
    try {
      await removeCategoryFromVideo(selectedVideo!.id, category.id);
      await revalidate('/cms/videos');
    } catch (e) {
      console.error(e);
      alert(e);
    }
  }

  if (selectedVideo === null)
    return <div className="grow text-center text-20 text-gray-500">Select video</div>;

  return (
    <div className="flex flex-col gap-16">
      <div className="code text-20 font-700 text-black">{selectedVideo.id}</div>
      {selectedVideo.source === VideoSource.YOUTUBE && (
        <iframe
          src={`https://www.youtube.com/embed/${selectedVideo.sourceId}`}
          className="w-full"
        ></iframe>
      )}
      <div className="flex flex-col gap-4">
        <div className="code text-16 font-700 text-primary-500">
          {format(selectedVideo.date, 'yyMMdd')}
        </div>
        <div className="text-16 text-black">{selectedVideo.title}</div>
      </div>
      <div className="flex flex-col gap-16">
        <div className="flex">
          <div className="grow text-16 font-600">Category</div>
          <div
            onClick={() => setCategoryModalActive(true)}
            className="cursor-pointer text-16 font-400 text-primary-500 underline"
          >
            Add
          </div>
        </div>
        {categoryModalActive && (
          <Modal onCancel={() => setCategoryModalActive(false)}>
            <div className="flex flex-col">
              {categories.map(category => (
                <div
                  key={category.id}
                  onClick={() => handleCategoryAdd(category)}
                  className="cursor-pointer rounded-8 px-16 py-8 hover:bg-gray-100"
                >
                  <div className="text-18 text-black">{category.title}</div>
                </div>
              ))}
            </div>
          </Modal>
        )}
        <div className="flex flex-col gap-8">
          {selectedVideo.categories.map(category => (
            <div key={category.id} className="flex">
              <div className="grow text-16 text-black">
                {categories.find(c => c.id === category.id)?.title}
              </div>
              <div
                onClick={() => handleCategoryRemove(category)}
                className="cursor-pointer text-16 text-gray-500 underline"
              >
                Remove
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
