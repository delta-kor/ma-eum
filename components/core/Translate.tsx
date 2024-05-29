'use client';

import useTranslate from '@/hooks/translate';
import { i18n } from '@/utils/i18n';

interface Props {
  children: string;
}

export default function Translate({ children }: Props) {
  const { language } = useTranslate();
  const text = i18n(children, language);

  return <>{text}</>;
}
