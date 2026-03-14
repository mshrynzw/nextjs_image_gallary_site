import { notFound } from "next/navigation";
import { getImageList } from "@/lib/imageList.server";
import { ImageDetailClient } from "@/components/ImageDetailClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

/** SSG: public/image の枚数分だけ静的パスを生成 */
export async function generateStaticParams() {
  const list = getImageList();
  return list.map((_, i) => ({ id: String(i) }));
}

export default async function ImageDetailPage({ params }: PageProps) {
  const { id } = await params;
  const imageId = parseInt(id, 10);
  if (Number.isNaN(imageId)) notFound();

  const list = getImageList();
  const image = list[imageId] ?? null;
  if (!image) notFound();

  const total = list.length;
  return (
    <ImageDetailClient
      image={image}
      hasPrevious={imageId > 0}
      hasNext={imageId < total - 1}
      previousId={imageId - 1}
      nextId={imageId + 1}
    />
  );
}
