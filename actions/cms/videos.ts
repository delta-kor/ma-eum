'use server';

import prisma from '@/prisma/prisma';
import createId from '@/utils/id';
import { VideoMeta } from '@/utils/video';
import { VideoSource } from '@prisma/client';

interface YoutubeVideoJson {
  date: string;
  id: string;
  title: string;
}

export async function importYoutubeVideosFromJson(data: YoutubeVideoJson[]) {
  if (!Array.isArray(data)) throw new Error('Invalid json data');

  for (const item of data) {
    const existingVideo = await prisma.video.findFirst({
      where: { source: VideoSource.YOUTUBE, sourceId: item.id },
    });
    if (existingVideo) continue;

    await prisma.video.create({
      data: {
        date: new Date(item.date),
        id: createId(6),
        source: VideoSource.YOUTUBE,
        sourceId: item.id,
        title: item.title,
      },
    });
  }
}

export async function addCategoryToVideo(videoId: string, categoryId: string) {
  const video = await prisma.video.findFirst({ where: { id: videoId } });
  if (!video) throw new Error('Video not found');

  const category = await prisma.category.findFirst({ where: { id: categoryId } });
  if (!category) throw new Error('Category not found');

  await prisma.video.update({
    data: { categories: { connect: { id: categoryId } } },
    where: { id: videoId },
  });
}

export async function removeCategoryFromVideo(videoId: string, categoryId: string) {
  const video = await prisma.video.findFirst({ where: { id: videoId } });
  if (!video) throw new Error('Video not found');

  const category = await prisma.category.findFirst({ where: { id: categoryId } });
  if (!category) throw new Error('Category not found');

  await prisma.video.update({
    data: { categories: { disconnect: { id: categoryId } } },
    where: { id: videoId },
  });
}

export async function addMetaToVideo(videoId: string, meta: VideoMeta) {
  const video = await prisma.video.findFirst({ where: { id: videoId } });
  if (!video) throw new Error('Video not found');

  const metas = video.meta;
  const existingMeta = metas.find(item => item.type === meta.type);
  if (existingMeta) metas[metas.indexOf(existingMeta)] = meta;
  else metas.push(meta);

  await prisma.video.update({
    data: { meta: metas },
    where: { id: videoId },
  });
}

export async function removeMetaFromVideo(videoId: string, type: VideoMeta['type']) {
  const video = await prisma.video.findFirst({ where: { id: videoId } });
  if (!video) throw new Error('Video not found');

  const metas = video.meta;
  await prisma.video.update({
    data: { meta: metas.filter(item => item.type !== type) },
    where: { id: videoId },
  });
}
