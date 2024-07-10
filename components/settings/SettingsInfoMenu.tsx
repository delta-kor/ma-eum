export default function SettingsInfoMenu() {
  const hash = process.env.VERCEL_GIT_COMMIT_SHA || 'n/a';
  const deployId = process.env.VERCEL_DEPLOYMENT_ID || 'n/a';
  const region = process.env.VERCEL_REGION || 'n/a';

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-[max-content_auto] gap-x-16 gap-y-8">
        <div className="shrink-0 text-18 font-600 text-black">Region</div>
        <div className="code truncate text-right text-14 font-400 text-gray-500">{region}</div>

        <div className="shrink-0 text-18 font-600 text-black">Git SHA</div>
        <div className="code truncate text-right text-14 font-400 text-gray-500">
          {hash.slice(0, 7)}
        </div>

        <div className="shrink-0 text-18 font-600 text-black">Deploy ID</div>
        <div className="code truncate text-right text-14 font-400 text-gray-500">{deployId}</div>
      </div>
    </div>
  );
}
