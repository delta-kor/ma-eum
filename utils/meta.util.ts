import { Metadata } from 'next';

export default class MetaUtil {
  public static getBase(): Metadata {
    const title = 'MAEUM :: 마음 - CSR(첫사랑) Global Fanbase';
    const description = "It's time to go dive!";
    const url = process.env.NEXT_PUBLIC_META_URL_BASE || '';

    return {
      description,
      openGraph: {
        description,
        siteName: 'MAEUM (마음)',
        title,
        type: 'website',
        url,
      },
      title,
      twitter: {
        card: 'summary',
        description,
        title,
      },
    };
  }

  public static getSubpage(titleBase: string, description: string, urlBase: string): Metadata {
    const title = `${titleBase} | MAEUM :: 마음`;
    const url = `${process.env.NEXT_PUBLIC_META_URL_BASE || ''}${urlBase}`;

    return {
      description,
      openGraph: {
        description,
        title,
        url,
      },
      title,
    };
  }
}
