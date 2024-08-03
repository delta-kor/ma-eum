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
    ImageBoxes: [
      [0, 759, 876, 224, 83],
      [0, 817, 959, 166, 317],
      [1, 558, 959, 259, 269],
      [1, 593, 1228, 224, 111],
      [2, 41, 925, 175, 295],
      [3, 399, 929, 159, 373],
      [3, 558, 929, 43, 30],
      [4, 270, 659, 203, 254],
      [5, 484, 654, 231, 271],
      [6, 216, 959, 183, 392],
      [6, 77, 1220, 139, 167],
    ],
    ImageFaces: [
      [759, 689, 155, 187],
      [601, 769, 149, 190],
      [89, 758, 127, 167],
      [399, 745, 159, 184],
      [315, 479, 158, 180],
      [508, 474, 156, 180],
      [216, 758, 173, 201],
    ],
    ImageSize: [1000, 1499],
    ImageUrl: ProfileImage,
    MembersVideo: ['https://vx2.api.izflix.net/deliver/994145002?q=1440'],
  },
};

export default class AboutUtil {
  public static getAboutVideo(): string {
    return AboutData.AboutVideoUrl;
  }

  public static getBackgroundVideo(page: AboutPage, index: number): null | string {
    if (AboutUtil.needAboutVideo(page)) return AboutUtil.getAboutVideo();
    if (page === 'member') return AboutUtil.getMemberVideo(index);
    return null;
  }

  public static getIntroductionLength(): number {
    return AboutData.Introduction.Text.length;
  }

  public static getIntroductionText(index: number): null | string {
    return AboutData.Introduction.Text[index] || null;
  }

  public static getMemberVideo(index: number): null | string {
    return AboutData.Profile.MembersVideo[index] || null;
  }

  public static getProfileImage(): StaticImageData {
    return AboutData.Profile.ImageUrl;
  }

  public static getProfileImageBoxes(): [number, number, number, number, number][] {
    return AboutData.Profile.ImageBoxes as [number, number, number, number, number][];
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
