'use client';

import {
  addCategoryToVideo,
  addMetaToVideo,
  removeCategoryFromVideo,
  removeMetaFromVideo,
} from '@/actions/cms/videos.action';
import { revalidate } from '@/actions/revalidate.action';
import CmsModal from '@/components/cms/CmsModal';
import CmsVideosMeta from '@/components/cms/videos/CmsVideosMeta';
import { AvailableMetaTypes, VideoMeta, VideoMetaType } from '@/utils/video.util';
import { Category, Video, VideoSource } from '@prisma/client';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';

export type VideoExtended = { categories: Category[] } & Video;

interface Props {
  categories: Category[];
  selectedVideo: VideoExtended | null;
}

export default function CmsVideosInfo({ categories, selectedVideo }: Props) {
  const [categoryModalActive, setCategoryModalActive] = useState(false);
  const [metaModalActive, setMetaModalActive] = useState(false);
  const [sketchMetaTypes, setSketchMetaTypes] = useState<VideoMetaType[]>([]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [metaModalActive, handleKeyDown, sketchMetaTypes]);

  useEffect(() => {
    setSketchMetaTypes([]);
  }, [selectedVideo]);

  function handleKeyDown(e: KeyboardEvent) {
    const key = e.key;
    if (!metaModalActive) return false;

    if (key === 's') handleMetaSketchAdd('shorts');
    if (key === 'm') handleMetaSketchAdd('music');
    if (key === 'b') handleMetaSketchAdd('members');
    if (key === 'e') handleMetaSketchAdd('episode');
    if (key === 'i') handleMetaSketchAdd('inbound_challenge');
  }

  async function handleCategoryAdd(category: Category) {
    if (selectedVideo === null) return;

    try {
      setCategoryModalActive(false);
      await addCategoryToVideo(selectedVideo.id, category.id);
      await revalidate('/cms/videos');
    } catch (e) {
      console.error(e);
      alert(e);
    }
  }

  async function handleCategoryRemove(category: Category) {
    if (selectedVideo === null) return;

    try {
      await removeCategoryFromVideo(selectedVideo.id, category.id);
      await revalidate('/cms/videos');
    } catch (e) {
      console.error(e);
      alert(e);
    }
  }

  function getMeta<T extends VideoMeta>(type: T['type']): T | undefined {
    if (selectedVideo === null) return;
    return (selectedVideo.meta.find(meta => meta.type === type) as T) || undefined;
  }

  async function handleMetaSet(data: VideoMeta) {
    if (selectedVideo === null) return;

    try {
      await addMetaToVideo(selectedVideo!.id, data);
      await revalidate('/cms/videos');
    } catch (e) {
      console.error(e);
      alert(e);
    }
  }

  async function handleMetaRemove(type: VideoMetaType) {
    if (selectedVideo === null) return;

    try {
      await removeMetaFromVideo(selectedVideo!.id, type);
      await revalidate('/cms/videos');
    } catch (e) {
      console.error(e);
      alert(e);
    }
  }

  function handleMetaAdd() {
    setMetaModalActive(true);
  }

  function handleMetaSketchAdd(type: VideoMetaType) {
    setSketchMetaTypes([...sketchMetaTypes, type]);
    setMetaModalActive(false);
  }

  const currentMetaTypes = selectedVideo?.meta.map(meta => meta.type) || [];
  const activeMetaTypes = Array.from(new Set([...sketchMetaTypes, ...currentMetaTypes]));

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
          <CmsModal onCancel={() => setCategoryModalActive(false)}>
            <div className="flex flex-col">
              {categories.map(category => (
                <div
                  key={category.id}
                  onClick={() => handleCategoryAdd(category)}
                  className="cursor-pointer rounded-8 px-16 py-8 hover:bg-gray-100"
                >
                  <div className="text-16 text-black">{category.title}</div>
                </div>
              ))}
            </div>
          </CmsModal>
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
      <div className="h-2 bg-gray-200" />
      <div key={selectedVideo.id} className="flex flex-col gap-16">
        <div onClick={handleMetaAdd} className="cursor-pointer text-16 text-gray-500 underline">
          Add
        </div>
        {activeMetaTypes.map(displayedMeta => (
          <CmsVideosMeta
            key={displayedMeta}
            data={getMeta(displayedMeta)}
            type={displayedMeta}
            onRemove={handleMetaRemove}
            onSet={handleMetaSet}
          />
        ))}
        {metaModalActive && (
          <CmsModal onCancel={() => setMetaModalActive(false)}>
            <div className="flex flex-col">
              {AvailableMetaTypes.map(type => (
                <div
                  key={type}
                  onClick={() => handleMetaSketchAdd(type)}
                  className="cursor-pointer rounded-8 px-16 py-8 hover:bg-gray-100"
                >
                  <div className="text-16 text-black">{type}</div>
                </div>
              ))}
            </div>
          </CmsModal>
        )}
      </div>
    </div>
  );
}
