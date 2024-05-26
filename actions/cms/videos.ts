'use server';

import prisma from '@/prisma/prisma';
import createId from '@/utils/id';
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
