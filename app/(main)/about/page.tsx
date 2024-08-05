import AboutFrame from '@/components/about/AboutFrame';
import AboutProvider from '@/providers/AboutProvider';

export default function AboutPage() {
  return (
    <AboutProvider>
      <AboutFrame />
    </AboutProvider>
  );
}
