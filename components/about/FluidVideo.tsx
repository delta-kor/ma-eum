import { useState } from 'react';

interface Props {
  src: string;
}

export default function FluidVideo({ src }: Props) {
  const [isActive, setIsActive] = useState(false);

  function handleLoadStart() {
    setIsActive(false);
  }

  function handleLoadComplete() {
    setIsActive(true);
  }

  return (
    <video
      data-active={isActive}
      src={src}
      onCanPlayThrough={handleLoadComplete}
      onLoadStart={handleLoadStart}
      autoPlay
      disableRemotePlayback
      loop
      muted
      playsInline
      className="absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-1000 data-[active=true]:opacity-30"
    />
  );
}
