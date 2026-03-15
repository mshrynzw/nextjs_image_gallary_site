import Link from "next/link";
import Image from "next/image";
import { Download, Play } from "lucide-react";
import type { ImageItem } from "@/lib/imageData";

interface ImageCardProps extends ImageItem {}

export function ImageCard({ id, path, type }: ImageCardProps) {
  const filename = path.split("/").pop() ?? (type === "video" ? "video" : "image");

  return (
    <div className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100">
      <Link href={`/image/${id}`} className="block h-full w-full cursor-pointer">
        {type === "video" ? (
          <>
            <video
              src={path}
              muted
              playsInline
              preload="metadata"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-gray-800 shadow-lg opacity-0 transition-opacity group-hover:opacity-100">
              <Play className="h-8 w-8 fill-current" />
            </div>
          </>
        ) : (
          <Image
            src={path}
            alt="Gallery image"
            width={400}
            height={400}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        )}
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
      </Link>
      <a
        href={path}
        download={filename}
        className="absolute bottom-2 right-2 z-10 rounded-full bg-white/90 p-2 text-gray-700 shadow-md opacity-0 transition-opacity hover:bg-white hover:text-gray-900 group-hover:opacity-100"
        aria-label={type === "video" ? "動画をダウンロード" : "画像をダウンロード"}
      >
        <Download className="h-5 w-5" />
      </a>
    </div>
  );
}
