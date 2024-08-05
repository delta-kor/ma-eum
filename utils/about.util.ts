import { AboutPage } from '@/providers/AboutProvider';
import ProfileImage from '@/public/about/profile.webp';
import { StaticImageData } from 'next/image';

export interface MemberInfo {
  birth: string;
  firstName: string;
  koreanName: string;
  lastName: string;
  position: string;
  sign: any;
}

export interface AlbumInfo {
  cover: StaticImageData;
  date: string;
  title: string;
  tracks: { isTitle?: boolean; title: string }[];
}

const AboutData = {
  AboutVideoUrl: '/api/video?id=992044763?q=1440',
  Discography: {
    AlbumsInfo: [
      {
        cover: require('@/public/about/album/sequence_7272.jpg'),
        date: '2022. 07. 27.',
        title: 'Sequence : 7272',
        tracks: [
          { title: '열일곱 (72.72Hz)' },
          { isTitle: true, title: '첫사랑 (Pop? Pop!)' },
          { title: '비밀이야 (Manito)' },
          { title: '지금 너에게 보내 (Toi Et Moi)' },
          { title: '으랏차 (Euratcha!)' },
        ],
      },
      {
        cover: require('@/public/about/album/sequence_17&.jpg'),
        date: '2022. 11. 17.',
        title: 'Sequence : 17&',
        tracks: [{ title: 'Anding (&)' }, { isTitle: true, title: '러브티콘 (♡TiCON)' }],
      },
      {
        cover: require('@/public/about/album/delight.jpg'),
        date: '2023. 03. 29.',
        title: 'DELIGHT',
        tracks: [
          { title: '열여덟 (Signal)' },
          { isTitle: true, title: '빛을 따라서 (Shining Bright)' },
          { title: '소풍 (Picnic)' },
          { title: '마음이 피어요 (Dandelion)' },
        ],
      },
      {
        cover: require('@/public/about/album/hbd_to_you.jpg'),
        date: '2023. 12. 17.',
        title: 'HBD To You',
        tracks: [
          { isTitle: true, title: 'HBD To You' },
          { isTitle: true, title: 'HBD To You (Midnight ver.)' },
          { title: 'HBD To You (Inst.)' },
        ],
      },
      {
        cover: require('@/public/about/album/l_heure_bleue_prologue.jpg'),
        date: '2024. 06. 11.',
        title: "L'heure Bleue : Prologue",
        tracks: [{ title: '열아홉 (Hello)' }, { isTitle: true, title: 'Pretty Mob' }],
      },
      {
        cover: require('@/public/about/album/l_heure_bleue.jpg'),
        date: '2024. 07. 03.',
        title: "L'heure Bleue",
        tracks: [
          { title: 'Hello (Japanese Ver.)' },
          { title: 'Pretty Mob (Japanese Ver.)' },
          { isTitle: true, title: 'Higher' },
          { title: 'Blueway' },
        ],
      },
    ],
    AlbumsVideo: [
      '/api/video?id=994795645',
      '/api/video?id=994893891',
      '/api/video?id=994895888',
      '/api/video?id=994897241',
      '/api/video?id=994911204',
      '/api/video?id=994914653',
    ],
  },
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
    MembersInfo: [
      {
        birth: '2005. 03. 04.',
        firstName: 'Geumhee',
        koreanName: '한금희',
        lastName: 'Han',
        position: 'Dancer, Rapper',
        sign: require('@/public/lottie/sign-geumhee.json'),
      },
      {
        birth: '2005. 03. 12.',
        firstName: 'Sihyeon',
        koreanName: '황시현',
        lastName: 'Hwang',
        position: 'Dancer, Rapper',
        sign: require('@/public/lottie/sign-sihyeon.json'),
      },
      {
        birth: '2005. 03. 26.',
        firstName: 'Seoyeon',
        koreanName: '안서연',
        lastName: 'Ahn',
        position: 'Vocalist, Dancer',
        sign: require('@/public/lottie/sign-seoyeon.json'),
      },
      {
        birth: '2005. 04. 23.',
        firstName: 'Yuna',
        koreanName: '이이무라 유나',
        lastName: 'Iimura',
        position: 'Vocalist, Dancer',
        sign: require('@/public/lottie/sign-yuna.json'),
      },
      {
        birth: '2005. 04. 28.',
        firstName: 'Duna',
        koreanName: '강두나',
        lastName: 'Kang',
        position: 'Center, Vocalist',
        sign: require('@/public/lottie/sign-duna.json'),
      },
      {
        birth: '2005. 7. 23.',
        firstName: 'Sua',
        koreanName: '유수아',
        lastName: 'Yoo',
        position: 'Former Leader, Vocalist',
        sign: require('@/public/lottie/sign-sua.json'),
      },
      {
        birth: '2005. 10. 07.',
        firstName: 'Yeham',
        koreanName: '구예함',
        lastName: 'Koo',
        position: 'Main Vocalist',
        sign: require('@/public/lottie/sign-yeham.json'),
      },
    ],
    MembersVideo: [
      '/api/video?id=994145002',
      '/api/video?id=994388899',
      '/api/video?id=994417254',
      '/api/video?id=994417798',
      '/api/video?id=994419393',
      '/api/video?id=994421762',
      '/api/video?id=994423976',
    ],
  },
};

export default class AboutUtil {
  public static getAboutVideo(): string {
    return AboutData.AboutVideoUrl;
  }

  public static getAlbumInfo(index: number): AlbumInfo | null {
    return AboutData.Discography.AlbumsInfo[index] || null;
  }

  public static getAlbumVideo(index: number): null | string {
    return AboutData.Discography.AlbumsVideo[index] || null;
  }

  public static getAlbumsCount(): number {
    return AboutData.Discography.AlbumsInfo.length;
  }

  public static getBackgroundVideo(page: AboutPage, index: number): null | string {
    if (AboutUtil.needAboutVideo(page)) return AboutUtil.getAboutVideo();
    if (page === 'member') return AboutUtil.getMemberVideo(index);
    if (page === 'discography') return AboutUtil.getAlbumVideo(index);
    return null;
  }

  public static getIntroductionLength(): number {
    return AboutData.Introduction.Text.length;
  }

  public static getIntroductionText(index: number): null | string {
    return AboutData.Introduction.Text[index] || null;
  }

  public static getMemberInfo(index: number): MemberInfo | null {
    return AboutData.Profile.MembersInfo[index] || null;
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

  public static isMemberLeader(index: number): boolean {
    return index === 4;
  }

  public static isMutedPage(page: AboutPage): boolean {
    return page !== 'discography';
  }

  public static needAboutVideo(page: AboutPage): boolean {
    return ['introduction', 'landing'].includes(page);
  }
}
