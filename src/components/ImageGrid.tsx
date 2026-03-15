import { ImageCard } from "./ImageCard";
import type { ImageItem } from "@/lib/imageData";

interface ImageGridProps {
  images: ImageItem[];
}

export function ImageGrid({ images }: ImageGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {images.map((image) => (
        <ImageCard
          key={image.id}
          id={image.id}
          path={image.path}
          aspectRatio={image.aspectRatio}
          type={image.type}
        />
      ))}
    </div>
  );
}
