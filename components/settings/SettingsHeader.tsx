import ArtisticText from '@/components/core/ArtisticText';
import packageJson from '@/package.json';

export default function SettingsHeader() {
  const version = packageJson.version;

  return (
    <div className="flex flex-col items-center gap-12">
      <ArtisticText type="maeum" className="h-24 text-primary-500" />
      <div className="text-20 font-500 text-gray-500">v{version}</div>
    </div>
  );
}
