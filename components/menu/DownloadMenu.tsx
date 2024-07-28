import Pc from '@/components/core/responsive/Pc';
import AosChrome from '@/public/guide/aos-chrome.jpg';
import IosSafari from '@/public/guide/ios-safari.jpg';
import Image from 'next/image';

export default function DownloadMenu() {
  return (
    <div className="flex flex-col gap-16">
      <Pc>
        <div className="text-24 font-600 text-black">Download Mobile App</div>
      </Pc>
      <div className="flex flex-col gap-8 font-400 leading-7">
        <p className="text-18 text-black">
          maeum.me supports PWA(Progressive Web App) which allows you to install the app on your
          device.
        </p>
        <p className="text-16 text-gray-500">
          PWAs offer a more app-like experience than regular browser shortcuts, with faster loading,
          home screen installation, and much more.
        </p>
      </div>
      <div className="h-1 self-stretch bg-gray-100" />
      <div className="flex flex-col gap-24 lg:max-w-[540px]">
        <div className="flex flex-col gap-8">
          <div className="text-18 font-600 text-primary-500">Chrome (Android)</div>
          <Image alt="AOS Chrome" src={AosChrome} className="rounded-16" />
        </div>
        <div className="flex flex-col gap-8">
          <div className="text-18 font-600 text-primary-500">Safari (iOS)</div>
          <Image alt="IOS Safari" src={IosSafari} className="rounded-16" />
        </div>
      </div>
      <div className="h-1 self-stretch bg-gray-100" />
      <div className="flex flex-col gap-4 text-16 font-400 leading-7 text-gray-500">
        <p>
          Chrome on iOS does not support PWA installation.
          <br />
          Please use Safari for iOS.
        </p>
      </div>
    </div>
  );
}
