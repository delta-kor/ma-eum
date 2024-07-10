import ArtisticText from '@/components/core/ArtisticText';

export default function SettingsHeader() {
  return (
    <div className="flex flex-col items-center gap-12">
      <ArtisticText type="maeum" className="h-24 text-primary-500" />
      <div className="text-20 font-500 text-gray-500">v{process.env.npm_package_version}</div>
    </div>
  );
}
