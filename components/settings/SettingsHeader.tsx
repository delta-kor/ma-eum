import ArtisticText from '@/components/core/ArtisticText';

export default function SettingsHeader() {
  const gitHash = process.env.VERCEL_GIT_COMMIT_SHA || 'N/A';

  return (
    <div className="flex flex-col items-center gap-12">
      <ArtisticText type="maeum" className="h-24 text-primary-500" />
      <div className="flex items-center gap-8">
        <div className="text-20 font-500 text-gray-500">v{process.env.npm_package_version}</div>
        <div className="size-4 rounded-full bg-gray-200" />
        <div className="text-20 font-500 text-gray-500">{gitHash.slice(0, 7)}</div>
      </div>
    </div>
  );
}
