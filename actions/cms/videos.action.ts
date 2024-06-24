'use server';

import prisma from '@/prisma/prisma';
import { MusicService } from '@/services/music.service';
import createId from '@/utils/id.util';
import Secure from '@/utils/secure.util';
import { parseVoyageDate } from '@/utils/time.util';
import { VideoMeta, VideoMetaType } from '@/utils/video.util';
import { VoyageSession, getCSRMemberByVoyageMember } from '@/utils/voyage.util';
import { SessionType, VideoSource } from '@prisma/client';
import 'server-only';

interface YoutubeVideoJson {
  date: string;
  id: string;
  title: string;
}

export async function importYoutubeVideosFromJson(data: YoutubeVideoJson[]) {
  Secure.authorize();
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
        metaInfo: {
          create: {},
        },
        source: VideoSource.YOUTUBE,
        sourceId: item.id,
        title: item.title,
      },
    });
  }
}

export async function importVoyageVideosFromJson(data: VoyageSession[], musicId: string) {
  Secure.authorize();
  if (!Array.isArray(data)) throw new Error('Invalid json data');

  const music = await MusicService.getOne(musicId);
  if (!music) throw new Error('Music not found');

  for (const session of data) {
    const sessionId = createId(6);
    const date = parseVoyageDate(session.date);
    await prisma.session.create({
      data: {
        date,
        id: sessionId,
        music: { connect: { id: musicId } },
        program: session.program,
        title: session.program,
        type: SessionType.PROGRAM,
        videos: {
          create: session.videos.map(video => {
            const member = getCSRMemberByVoyageMember(video.member);

            return {
              date,
              id: createId(6),
              metaInfo: {
                create: {
                  members: member ? { create: { members: [member] } } : {},
                  music: { create: { musicId } },
                  stage: { create: { sessionId, tag: video.tag, time: video.time } },
                },
              },
              source: VideoSource.YOUTUBE,
              sourceId: video.youtubeId,
              title: video.title,
            };
          }),
        },
      },
    });
  }
}

export async function addCategoryToVideo(videoId: string, categoryId: string) {
  Secure.authorize();

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
  Secure.authorize();

  const video = await prisma.video.findFirst({ where: { id: videoId } });
  if (!video) throw new Error('Video not found');

  const category = await prisma.category.findFirst({ where: { id: categoryId } });
  if (!category) throw new Error('Category not found');

  await prisma.video.update({
    data: { categories: { disconnect: { id: categoryId } } },
    where: { id: videoId },
  });
}

export async function addMetaToVideo(videoId: string, meta: VideoMeta, type: VideoMetaType) {
  Secure.authorize();

  const video = await prisma.video.findFirst({ where: { id: videoId } });
  if (!video) throw new Error('Video not found');

  await prisma.metaInfo.update({
    data: {
      [type]: {
        upsert: {
          create: meta,
          update: meta,
        },
      },
    },
    where: { videoId },
  });
}

export async function removeMetaFromVideo(videoId: string, type: VideoMetaType) {
  Secure.authorize();

  const video = await prisma.video.findFirst({ where: { id: videoId } });
  if (!video) throw new Error('Video not found');

  await prisma.metaInfo.update({
    data: { [type]: { delete: true } },
    where: { videoId },
  });
}
