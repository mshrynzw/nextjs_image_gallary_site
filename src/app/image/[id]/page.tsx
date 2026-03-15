import { notFound } from "next/navigation";
import { getMediaList } from "@/lib/imageList.server";
import { ImageDetailClient } from "@/components/ImageDetailClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

/** SSG: メディア（画像＋動画）の数だけ静的パスを生成 */
export async function generateStaticParams() {
  const list = getMediaList();
  return list.map((_, i) => ({ id: String(i) }));
}

export default async function ImageDetailPage({ params }: PageProps) {
  const { id } = await params;
  const mediaId = parseInt(id, 10);
  if (Number.isNaN(mediaId)) notFound();

  const list = getMediaList();
  const image = list[mediaId] ?? null;
  if (!image) notFound();

  const total = list.length;
  return (
    <ImageDetailClient
      image={image}
      hasPrevious={mediaId > 0}
      hasNext={mediaId < total - 1}
      previousId={mediaId - 1}
      nextId={mediaId + 1}
    />
  );
}
