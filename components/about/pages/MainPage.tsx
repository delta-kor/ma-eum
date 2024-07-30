import Lottie from 'lottie-react';

export default function AboutMainPage() {
  function handleEnded() {
    console.log('end');
  }

  return (
    <div className="relative flex size-full flex-col items-center justify-center">
      <div>
        <Lottie
          animationData={require('@/public/lottie/about-csr.json')}
          loop={false}
          onEnded={handleEnded}
        />
      </div>
      <div className="absolute inset-x-24 bottom-24 flex flex-col gap-12">
        <div className="jelly jelly-reduced cursor-pointer select-none rounded-16 bg-white px-12 py-16 text-center text-20 font-600 text-black hover:scale-[1.02]">
          Introduction
        </div>
        <div className="flex items-center gap-12">
          <div className="jelly grow basis-0 cursor-pointer select-none rounded-16 bg-black/30 px-12 py-16 text-center text-20 font-400 text-white hover:scale-[1.02]">
            Profile
          </div>
          <div className="jelly grow basis-0 cursor-pointer select-none rounded-16 bg-black/30 px-12 py-16 text-center text-20 font-400 text-white hover:scale-[1.02]">
            Discography
          </div>
        </div>
      </div>
    </div>
  );
}
