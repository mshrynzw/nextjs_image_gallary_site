import { GalleryClient } from "@/components/GalleryClient";
import { getMediaList } from "@/lib/imageList.server";
import { IMAGES_PER_PAGE } from "@/lib/imageData";

/** トップページ: public/image と public/video のメディア一覧を表示（SSG） */
export default function GalleryPage() {
  const allMedia = getMediaList();
  const initialMedia = allMedia.slice(0, IMAGES_PER_PAGE);

  if (allMedia.length === 0) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-8">
        <p className="text-center text-gray-500">
          public/image に画像（.jpg, .png, .gif, .webp）、
          public/video に動画（.mp4, .webm, .mov, .ogg）を追加してください。
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <GalleryClient
        initialImages={initialMedia}
        allImages={allMedia}
      />
    </main>
  );
}
