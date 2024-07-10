import packageJson from '@/package.json';

export default function SettingsInfo() {
  const email = 'example@gmail.com';
  const dependencies = Object.keys(packageJson.dependencies);

  return (
    <div className="flex flex-col gap-32">
      <div className="flex flex-col gap-10">
        <div className="text-18 font-700 text-primary-500">Contact</div>
        <div className="flex flex-col gap-4 text-16 font-400 text-black">
          <div>Email: {email}</div>
          <div>Kakao: https://example.com/</div>
          <div>Form: https://example.com/</div>
        </div>
      </div>

      <div className="flex flex-col gap-10">
        <div className="text-18 font-700 text-primary-500">Disclaimer</div>
        <div className="flex flex-col gap-12 text-16 font-400 text-black">
          <div>
            This website is a fan-website of CSR and{' '}
            <span className="font-600 underline">is not an official website.</span>
          </div>
          <div>
            This website does not represent the official position of CSR and its related companies.
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-10">
        <div className="text-18 font-700 text-primary-500">AI Contents</div>
        <div className="flex flex-col gap-12 text-16 font-400 text-black">
          <div>This website may contain content created by AI or other automated technologies.</div>
          <div>Followings are partially generated by AI:</div>
          <div className="pl-16">- Landing page banner</div>
        </div>
      </div>

      <div className="flex flex-col gap-10">
        <div className="text-18 font-700 text-primary-500">Copyrights</div>
        <div className="flex flex-col gap-12 text-16 font-400 text-black">
          <div>
            This website may contain copyrighted content for non-profit use. Every copyrighted
            content is provided with external link of its original form.
          </div>
          <div>
            All rights and credit go directly to its rightful owner(s). No copyright infringement
            intended.
          </div>
          <div className="font-600">Takedown request: {email}</div>
        </div>
      </div>

      <div className="flex max-w-screen-sm flex-col gap-10">
        <div className="text-18 font-700 text-primary-500">Open Source License</div>
        <div className="grid grid-cols-2 gap-4 text-16 font-400 text-black">
          {dependencies.map(dependency => (
            <a
              key={dependency}
              href={`https://npmjs.com/package/${dependency}`}
              target="_blank"
              className="truncate"
            >
              {dependency}
            </a>
          ))}
        </div>
      </div>

      <div className="flex max-w-screen-sm flex-col gap-10">
        <div className="text-18 font-700 text-primary-500">Shipped on</div>
        <div className="flex flex-col gap-4 text-16 font-400 text-black">
          <div>Vercel: sin1/ap-southeast-1 (Singapore) / Edge</div>
          <div>Neon: Asia Pacific (Singapore)</div>
          <div>Gcloud: 가산IDC LG U+/KINX (South Korea)</div>
        </div>
      </div>

      <div className="flex max-w-screen-sm flex-col gap-10">
        <div className="text-18 font-700 text-primary-500">Kickstarted on</div>
        <div className="flex flex-col gap-4 text-16 font-400 text-black">
          <div>2024. 5. 19.</div>
        </div>
      </div>

      <div className="flex max-w-screen-sm flex-col gap-10">
        <div className="text-18 font-700 text-primary-500">Released on</div>
        <div className="flex flex-col gap-4 text-16 font-400 text-black">
          <div>2024. 7. 27.</div>
        </div>
      </div>
    </div>
  );
}
