import prisma from '@/prisma/prisma';
import { VideoMeta, VideoMetaType } from '@/utils/video.util';
import { Video } from '@prisma/client';

export const revalidate = 0;

function getMetaFromVideo<T extends VideoMeta>(video: Video, metaType: T['type']): T | null {
  return (video.meta.find(meta => meta.type === metaType) as T) || null;
}

function getMeta(video: Video, type: VideoMetaType): any {
  const meta = getMetaFromVideo(video, type);
  if (meta === null) return undefined;
  const { type: _, ...rest } = meta;
  return rest;
}

export async function GET() {
  const videos = await prisma.video.findMany();
  for (const video of videos) {
    await prisma.video.update({
      data: {
        metaInfo: {
          delete: {},
        },
      },
      where: { id: video.id },
    });
  }

  for (const video of videos) {
    await prisma.video.update({
      data: {
        metaInfo: {
          create: {
            cover: {
              create: getMeta(video, 'cover'),
            },
            episode: {
              create: getMeta(video, 'episode'),
            },
            fancam: {
              create: getMeta(video, 'fancam'),
            },
            inboundChallenge: {
              create: getMeta(video, 'inbound_challenge'),
            },
            link: {
              create: getMeta(video, 'link'),
            },
            live: {
              create: getMeta(video, 'live'),
            },
            members: {
              create: getMeta(video, 'members'),
            },
            music: {
              create: getMeta(video, 'music'),
            },
            official: {
              create: getMeta(video, 'official'),
            },
            outboundChallenge: {
              create: getMeta(video, 'outbound_challenge'),
            },
            promotion: {
              create: getMeta(video, 'promotion'),
            },
            shorts: {
              create: getMeta(video, 'shorts'),
            },
            stage: {
              create: getMeta(video, 'stage'),
            },
          },
        },
      },
      where: { id: video.id },
    });
  }

  return Response.json({ success: true });
}
