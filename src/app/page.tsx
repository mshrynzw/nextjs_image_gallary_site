import { GalleryClient } from "@/components/GalleryClient";
import { getImageList } from "@/lib/imageList.server";
import { IMAGES_PER_PAGE } from "@/lib/imageData";

/** トップページ: public/image の画像一覧を表示（SSG） */
export default function GalleryPage() {
  const allImages = getImageList();
  const initialImages = allImages.slice(0, IMAGES_PER_PAGE);

  if (allImages.length === 0) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-8">
        <p className="text-center text-gray-500">
          public/image フォルダに画像（.jpg, .png, .gif, .webp）を追加してください。
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <GalleryClient
        initialImages={initialImages}
        allImages={allImages}
      />
    </main>
  );
}
