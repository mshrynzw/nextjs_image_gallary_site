import Link from "next/link";
import Image from "next/image";
import { Download } from "lucide-react";
import type { ImageItem } from "@/lib/imageData";

interface ImageCardProps extends ImageItem {}

export function ImageCard({ id, path }: ImageCardProps) {
  const filename = path.split("/").pop() ?? "image";

  return (
    <div className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100">
      <Link href={`/image/${id}`} className="block h-full w-full cursor-pointer">
        <Image
          src={path}
          alt="Gallery image"
          width={400}
          height={400}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
      </Link>
      <a
        href={path}
        download={filename}
        className="absolute bottom-2 right-2 z-10 rounded-full bg-white/90 p-2 text-gray-700 shadow-md opacity-0 transition-opacity hover:bg-white hover:text-gray-900 group-hover:opacity-100"
        aria-label="画像をダウンロード"
      >
        <Download className="h-5 w-5" />
      </a>
    </div>
  );
}
