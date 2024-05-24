export class ImageUrl {
  private static base = 'https://x.izflix.net/maeum';

  public static album(id: string): string {
    return `${ImageUrl.base}/album/${id}.jpg`;
  }

  public static category(id: string): string {
    return `${ImageUrl.base}/category/${id}.jpg`;
  }
}
