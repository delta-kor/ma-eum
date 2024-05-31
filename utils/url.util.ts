import { Member } from '@/utils/video.util';

export class ImageUrl {
  private static base = 'http://x.izflix.net/maeum';

  public static album(id: string): string {
    return `${ImageUrl.base}/album/${id}.png`;
  }

  public static category(id: string): string {
    return `${ImageUrl.base}/category/${id}.png`;
  }

  public static member(id: Member | null): string {
    return `${ImageUrl.base}/member/${id || 'csr'}.jpg`;
  }

  public static youtubeShortsThumbnail(id: string): string {
    return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  }

  public static youtubeThumbnail(id: string): string {
    return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  }
}
