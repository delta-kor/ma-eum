export class ImageUrl {
  private static base = 'https://x.izflix.net/maeum';

  public static album(id: string): string {
    return `${ImageUrl.base}/album/${id}.jpg`;
  }
}
