import { useEffect, useState } from "react";

export function useAllImagesLoaded(containerRef) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const images = containerRef.current.querySelectorAll("img");
    if (images.length === 0) {
      setLoaded(true);
      return;
    }

    let loadedCount = 0;

    const handleLoad = () => {
      loadedCount++;
      if (loadedCount === images.length) {
        setLoaded(true);
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        handleLoad();
      } else {
        img.addEventListener("load", handleLoad);
        img.addEventListener("error", handleLoad);
      }
    });

    return () => {
      images.forEach((img) => {
        img.removeEventListener("load", handleLoad);
        img.removeEventListener("error", handleLoad);
      });
    };
  }, [containerRef]);

  return loaded;
}
