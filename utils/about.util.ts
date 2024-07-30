import { AboutPage } from '@/providers/AboutProvider';

const AboutData = {
  AboutVideoUrl: 'https://vx2.api.izflix.net/deliver/992044763?q=1440',
};

export default class AboutUtil {
  public static getAboutVideo(): string {
    return AboutData.AboutVideoUrl;
  }

  public static getBackgroundVideo(page: AboutPage, index: number): string {
    if (AboutUtil.needAboutVideo(page)) return AboutUtil.getAboutVideo();
    return '';
  }

  public static needAboutVideo(page: AboutPage): boolean {
    return ['introduction', 'landing'].includes(page);
  }
}
