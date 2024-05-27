import TRPCProvider from '@/providers/TRPCProvider';
import TitleProvider from '@/providers/TitleProvider';
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
        <TranslateProvider>
          <TRPCProvider>
            <TitleProvider>{children}</TitleProvider>
          </TRPCProvider>
        </TranslateProvider>
      </body>
    </html>
  );
}
