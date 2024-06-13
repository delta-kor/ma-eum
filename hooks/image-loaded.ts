import { useEffect, useRef, useState } from 'react';

export default function useImageLoaded(src: string) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const ref = useRef<HTMLImageElement>(null);

  function handleImageLoad() {
    setIsLoaded(true);
  }

  useEffect(() => {
    const image = ref.current;
    if (!image) return;

    setIsLoaded(false);

    image.src = src;
    if (image.complete) setIsLoaded(true);
  }, [src]);

  return [ref, isLoaded, handleImageLoad] as const;
}
