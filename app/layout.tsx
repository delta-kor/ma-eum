import TRPCProvider from '@/providers/TRPCProvider';
import TranslateProvider from '@/providers/TranslateProvider';
import { ReactNode } from 'react';
import './globals.css';

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="ko">
      <body>
        <TRPCProvider>
          <TranslateProvider>{children}</TranslateProvider>
        </TRPCProvider>
      </body>
    </html>
  );
}
