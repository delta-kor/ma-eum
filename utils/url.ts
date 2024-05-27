export class ImageUrl {
  private static base = 'https://x.izflix.net/maeum';

  public static album(id: string): string {
    return `${ImageUrl.base}/album/${id}.jpg`;
  }

  public static category(id: string): string {
    return `${ImageUrl.base}/category/${id}.jpg`;
  }

  public static youtubeThumbnail(id: string): string {
    return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  }
}
