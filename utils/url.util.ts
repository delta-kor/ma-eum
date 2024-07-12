import { Member } from '@/utils/member.util';

export class ImageUrl {
  private static base = 'http://x.izflix.net/maeum';

  public static album(id: string): string {
    return ImageUrl.toCdnUrl(`${ImageUrl.base}/album/${id}.png`);
  }

  public static category(id: string): string {
    return ImageUrl.toCdnUrl(`${ImageUrl.base}/category/${id}.png`);
  }

  public static member(id: Member | null): string {
    return ImageUrl.toCdnUrl(`${ImageUrl.base}/member/${id || 'csr'}.jpg`);
  }

  public static youtubeShortsThumbnail(id: string): string {
    return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  }

  public static youtubeThumbnail(id: string): string {
    return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  }

  private static toCdnUrl(url: string): string {
    if (process.env.NEXT_PUBLIC_BYPASS_CDN === '1') return url;
    return '//wsrv.nl/?url=' + encodeURIComponent(url);
  }
}

export class VideoUrl {
  public static youtube(id: string): string {
    return `https://www.youtube.com/watch?v=${id}`;
  }
}

export type SearchParams = Record<string, string | undefined>;
