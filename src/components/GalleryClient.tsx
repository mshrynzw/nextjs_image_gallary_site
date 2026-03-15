"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ImageGrid } from "./ImageGrid";
import { Loader2 } from "lucide-react";
import { IMAGES_PER_PAGE } from "@/lib/imageData";
import type { ImageItem } from "@/lib/imageData";

interface GalleryClientProps {
  initialImages: ImageItem[];
  allImages: ImageItem[];
}

export function GalleryClient({
  initialImages,
  allImages,
}: GalleryClientProps) {
  const [visibleCount, setVisibleCount] = useState(initialImages.length);
  const [loading, setLoading] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);
  const hasMore = visibleCount < allImages.length;
  const images = allImages.slice(0, visibleCount);

  const loadMoreImages = useCallback(() => {
    if (loading || !hasMore) return;
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + IMAGES_PER_PAGE, allImages.length));
      setLoading(false);
    }, 300);
  }, [loading, hasMore, allImages.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMoreImages();
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) observer.observe(currentTarget);
    return () => {
      if (currentTarget) observer.unobserve(currentTarget);
    };
  }, [loadMoreImages]);

  return (
    <>
      <ImageGrid images={images} />
      <div ref={observerTarget} className="py-8">
        {loading && (
          <div className="flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        )}
        {!hasMore && images.length > 0 && (
          <p className="text-center text-gray-500">すべて表示しました</p>
        )}
      </div>
    </>
  );
}
