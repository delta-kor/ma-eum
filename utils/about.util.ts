import { AboutPage } from '@/providers/AboutProvider';
import ProfileImage from '@/public/about/profile.webp';
import { StaticImageData } from 'next/image';

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
  Profile: {
    ImageBoxes: [[]],
    ImageFaces: [
      [759, 689, 155, 187],
      [601, 769, 149, 190],
      [89, 758, 127, 167],
      [399, 745, 159, 184],
      [315, 479, 158, 180],
      [315, 479, 158, 180],
      [508, 474, 156, 180],
      [216, 758, 173, 201],
    ],
    ImageSize: [1000, 1499],
    ImageUrl: ProfileImage,
  },
};

export default class AboutUtil {
  public static getAboutVideo(): string {
    return AboutData.AboutVideoUrl;
  }

  public static getBackgroundVideo(page: AboutPage, index: number): null | string {
    if (AboutUtil.needAboutVideo(page)) return AboutUtil.getAboutVideo();
    return null;
  }

  public static getIntroductionLength(): number {
    return AboutData.Introduction.Text.length;
  }

  public static getIntroductionText(index: number): null | string {
    return AboutData.Introduction.Text[index] || null;
  }

  public static getProfileImage(): StaticImageData {
    return AboutData.Profile.ImageUrl;
  }

  public static getProfileImageFaces(): [number, number, number, number][] {
    return AboutData.Profile.ImageFaces as [number, number, number, number][];
  }

  public static getProfileImageSize(): [number, number] {
    return AboutData.Profile.ImageSize as [number, number];
  }

  public static needAboutVideo(page: AboutPage): boolean {
    return ['introduction', 'landing'].includes(page);
  }
}
