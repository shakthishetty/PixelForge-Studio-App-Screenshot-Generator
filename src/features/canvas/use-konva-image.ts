"use client";

import { useEffect, useState } from "react";

const imageCache = new Map<string, HTMLImageElement>();

export function useKonvaImage(url?: string): HTMLImageElement | null {
  const [image, setImage] = useState<HTMLImageElement | null>(() => {
    if (!url) return null;
    return imageCache.get(url) || null;
  });

  useEffect(() => {
    if (!url) {
      setImage(null);
      return;
    }

    if (imageCache.has(url)) {
      setImage(imageCache.get(url)!);
      return;
    }

    const img = new window.Image();
    if (!url.startsWith("data:")) {
      img.crossOrigin = "anonymous";
    }

    let isMounted = true;

    img.onload = () => {
      imageCache.set(url, img);
      if (isMounted) {
        setImage(img);
      }
    };

    img.onerror = (err) => {
      console.warn("Failed to load canvas image:", url, err);
      if (isMounted) {
        setImage(null);
      }
    };

    img.src = url;

    return () => {
      isMounted = false;
    };
  }, [url]);

  return image;
}
