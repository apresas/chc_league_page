import { useRef, useState } from "react";

export function useImageCounter(totalImages, delay = 100) {
  const [loadedCount, setLoadedCount] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const timeout = useRef(null);

  const handleImageLoad = () => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      setLoadedCount((prev) => {
        const next = prev + 1;
        if (next === totalImages) setImagesLoaded(true);
        return next;
      });
    }, delay);
  };

  return { imagesLoaded, handleImageLoad, loadedCount };
}
