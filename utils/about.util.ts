import { AboutPage } from '@/providers/AboutProvider';

const AboutData = {
  AboutVideoUrl: 'https://vx2.api.izflix.net/deliver/992044763?q=1440',
  Introduction: {
    Text: [
      'CSR(첫사랑) is a 7 member girlgroup under Pop Music Ent.\n\nPredebut, they were known as ‘05class’, referencing to all the members being born in 2005.',
      'CSR(Cheot Sa Rang) means ‘First Love’ in korean. CSR‘s fandom name is ‘Maeum’, which means ‘heart’!\n\nCSR has a rotational leadership, with the first year the leader being Sua, and this year it being Duna!',
      'CSR debuted on July 27, 2022 with the mini album ‘Sequence : 7272’ with the title track ‘Pop? Pop!’.\n\nCSR made their first comeback on November 17, 2022 with the single album ‘Sequence : 17&’, with title track ‘LOVETICON (♡TiCON)’.\n\nThey got their first win with LOVETICON on December 2, 2022!',
      'CSR made their second comeback on March 29 2023, with the mini album ‘Delight’, and title track ‘Shining Bright’!\n\nFor the anniversary of their fandom name (November 17, 2023), they released the digital single ‘HBD To You’, with many remixes of it being released.',
      'CSR made their latest comeback with their 2nd single album ‘L’Heure Bleue’ on June 11th, and had their Japanese debut on July 3rd!\n\nThey went on a Japanese tour from June 29th - July 19th!',
    ],
  },
};

export default class AboutUtil {
  public static getAboutVideo(): string {
    return AboutData.AboutVideoUrl;
  }

  public static getBackgroundVideo(page: AboutPage, index: number): string {
    if (AboutUtil.needAboutVideo(page)) return AboutUtil.getAboutVideo();
    return '';
  }

  public static getIntroductionLength(): number {
    return AboutData.Introduction.Text.length;
  }

  public static getIntroductionText(index: number): null | string {
    return AboutData.Introduction.Text[index] || null;
  }

  public static needAboutVideo(page: AboutPage): boolean {
    return ['introduction', 'landing'].includes(page);
  }
}
