import TRPCProvider from '@/providers/TRPCProvider';
import TranslateProvider from '@/providers/TranslateProvider';
import MetaUtil from '@/utils/meta.util';
import { GoogleTagManager } from '@next/third-parties/google';
import { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { ReactNode } from 'react';
import './globals.css';

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <head>
        <Script
          crossOrigin="anonymous"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
          strategy="lazyOnload"
          async
        />
      </head>
      <body>
        {process.env.GTM_ID && <GoogleTagManager gtmId={process.env.GTM_ID} />}
        <TRPCProvider>
          <TranslateProvider>{children}</TranslateProvider>
        </TRPCProvider>
      </body>
    </html>
  );
}

export function generateMetadata(): Metadata {
  return { ...MetaUtil.getBase(), manifest: '/manifest.json' };
}

export const viewport: Viewport = {
  interactiveWidget: 'resizes-visual',
};
