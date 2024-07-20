import TRPCProvider from '@/providers/TRPCProvider';
import TranslateProvider from '@/providers/TranslateProvider';
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
        <TRPCProvider>
          <TranslateProvider>{children}</TranslateProvider>
        </TRPCProvider>
        <Script
          src="https://t1.daumcdn.net/kas/static/ba.min.js"
          strategy="lazyOnload"
          type="text/javascript"
          async
        />
      </body>
    </html>
  );
}
