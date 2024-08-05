import AboutFrame from '@/components/about/AboutFrame';
import AboutProvider from '@/providers/AboutProvider';
import MetaUtil from '@/utils/meta.util';
import { Metadata } from 'next';

export default function AboutPage() {
  return (
    <AboutProvider>
      <AboutFrame />
    </AboutProvider>
  );
}

export function generateMetadata(): Metadata {
  return MetaUtil.getSubpage('About', 'Get to know our first love, CSR!', '/about');
}
