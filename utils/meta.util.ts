import OpenGraphImage from '@/app/(main)/opengraph-image.jpg';
import { ImageUrl } from '@/utils/url.util';
import { Metadata } from 'next';

export default class MetaUtil {
  public static getAlbumPage(
    albumId: string,
    albumTitle: string,
    type: 'performance' | 'promotion'
  ): Metadata {
    const title = `${type === 'performance' ? 'Performances' : 'Promotions'} - ${albumTitle} | MAEUM :: 마음`;
    const description = `Watch ${type === 'performance' ? 'performance' : 'promotion'} videos of ${albumTitle}.`;
    const url = `${process.env.NEXT_PUBLIC_META_URL_BASE || ''}/videos/albums/${albumId}/${type}`;

    return {
      description,
      openGraph: {
        description,
        images: [{ url: OpenGraphImage.src }],
        siteName: 'MAEUM (마음)',
        title,
        type: 'website',
        url,
      },
      title,
      twitter: {
        card: 'summary',
        description,
        title,
      },
    };
  }

  public static getBase(): Metadata {
    const title = 'MAEUM :: 마음 - CSR(첫사랑) Global Fanbase';
    const description = "It's time to go dive!";
    const url = process.env.NEXT_PUBLIC_META_URL_BASE || 'https://example.com';

    return {
      description,
      metadataBase: new URL(url),
      openGraph: {
        description,
        images: [{ url: OpenGraphImage.src }],
        siteName: 'MAEUM (마음)',
        title,
        type: 'website',
        url,
      },
      title,
      twitter: {
        card: 'summary',
        description,
        title,
      },
    };
  }

  public static getIsolatedPage(titleBase: string, urlBase: string): Metadata {
    const title = `${titleBase} | MAEUM :: 마음`;
    const url = `${process.env.NEXT_PUBLIC_META_URL_BASE || ''}${urlBase}`;

    return {
      openGraph: {
        images: [{ url: OpenGraphImage.src }],
        siteName: 'MAEUM (마음)',
        title,
        type: 'website',
        url,
      },
      robots: {
        googleBot: {
          index: false,
          noimageindex: true,
        },
        index: false,
        nocache: true,
      },
      title,
      twitter: {
        card: 'summary',
        title,
      },
    };
  }

  public static getSubpage(titleBase: string, description: string, urlBase: string): Metadata {
    const title = `${titleBase} | MAEUM :: 마음`;
    const url = `${process.env.NEXT_PUBLIC_META_URL_BASE || ''}${urlBase}`;

    return {
      description,
      openGraph: {
        description,
        images: [{ url: OpenGraphImage.src }],
        siteName: 'MAEUM (마음)',
        title,
        type: 'website',
        url,
      },
      title,
      twitter: {
        card: 'summary',
        description,
        title,
      },
    };
  }

  public static getTalkArticlePage(articleId: string, articleTitle: string): Metadata {
    const title = `${articleTitle} - Talk | MAEUM :: 마음`;
    const description = 'MAEUM Talk - Share and discuss about CSR(첫사랑) with global fans!';
    const url = `${process.env.NEXT_PUBLIC_META_URL_BASE || ''}/talk/article/${articleId}`;

    return {
      description,
      openGraph: {
        description,
        images: [{ url: OpenGraphImage.src }],
        siteName: 'MAEUM (마음)',
        title,
        type: 'website',
        url,
      },
      title,
      twitter: {
        card: 'summary',
        description,
        title,
      },
    };
  }

  public static getVideoPage(videoId: string, videoSourceId: string, videoTitle: string): Metadata {
    const title = `${videoTitle} | MAEUM :: 마음`;
    const description = 'Watch and enjoy videos from CSR(첫사랑)';
    const url = `${process.env.NEXT_PUBLIC_META_URL_BASE || ''}/video/${videoId}`;

    return {
      description,
      openGraph: {
        description,
        images: [{ url: ImageUrl.youtubeThumbnail(videoSourceId) }],
        siteName: 'MAEUM (마음)',
        title,
        type: 'website',
        url,
      },
      title,
      twitter: {
        card: 'summary_large_image',
        description,
        images: [{ url: ImageUrl.youtubeThumbnail(videoSourceId) }],
        title,
      },
    };
  }
}
