"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { X, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { useEffect } from "react";
import type { ImageItem } from "@/lib/imageData";

interface ImageDetailClientProps {
  image: ImageItem;
  hasPrevious: boolean;
  hasNext: boolean;
  previousId: number;
  nextId: number;
}

export function ImageDetailClient({
  image,
  hasPrevious,
  hasNext,
  previousId,
  nextId,
}: ImageDetailClientProps) {
  const router = useRouter();

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") router.push("/");
      if (e.key === "ArrowLeft" && hasPrevious) router.push(`/image/${previousId}`);
      if (e.key === "ArrowRight" && hasNext) router.push(`/image/${nextId}`);
    };

    document.addEventListener("keydown", handleKeydown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeydown);
      document.body.style.overflow = "unset";
    };
  }, [router, hasPrevious, hasNext, previousId, nextId]);

  const filename = image.path.split("/").pop() ?? "image";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="absolute right-4 top-4 z-10 flex items-center gap-2">
        <a
          href={image.path}
          download={filename}
          className="rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
          aria-label="画像をダウンロード"
        >
          <Download className="h-6 w-6" />
        </a>
        <Link
          href="/"
          className="rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
          aria-label="閉じる"
        >
          <X className="h-6 w-6" />
        </Link>
      </div>

      {hasPrevious && (
        <Link
          href={`/image/${previousId}`}
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
          aria-label="前の画像"
        >
          <ChevronLeft className="h-6 w-6" />
        </Link>
      )}

      {hasNext && (
        <Link
          href={`/image/${nextId}`}
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
          aria-label="次の画像"
        >
          <ChevronRight className="h-6 w-6" />
        </Link>
      )}

      <div className="relative mx-auto max-h-[90vh] max-w-[90vw]">
        <Image
          src={image.path}
          alt="Gallery image"
          width={1080}
          height={1080}
          className="max-h-[90vh] max-w-[90vw] object-contain"
          style={{ aspectRatio: image.aspectRatio }}
          priority
        />
      </div>
    </div>
  );
}
