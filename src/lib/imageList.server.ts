import fs from "fs";
import path from "path";
import type { ImageItem } from "./imageData";

const IMAGE_DIR = path.join(process.cwd(), "public", "image");
const VIDEO_DIR = path.join(process.cwd(), "public", "video");
const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
const VIDEO_EXTENSIONS = [".mp4", ".webm", ".mov", ".ogg"];

function listFiles(dir: string, extensions: string[]): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) =>
      extensions.includes(path.extname(f).toLowerCase())
    )
    .sort();
}

/**
 * public/image 内の画像ファイル一覧を取得（ビルド時・サーバー専用）
 * 後方互換のため残している。ギャラリーでは getMediaList() を使用すること。
 */
export function getImageList(): ImageItem[] {
  const files = listFiles(IMAGE_DIR, IMAGE_EXTENSIONS);
  return files.map((filename, index) => ({
    id: index,
    path: `/image/${filename}`,
    aspectRatio: 1,
    type: "image" as const,
  }));
}

/**
 * public/image と public/video を結合したメディア一覧を取得（画像→動画の順、id は通し）
 */
export function getMediaList(): ImageItem[] {
  const imageFiles = listFiles(IMAGE_DIR, IMAGE_EXTENSIONS);
  const videoFiles = listFiles(VIDEO_DIR, VIDEO_EXTENSIONS);

  const images: ImageItem[] = imageFiles.map((filename, index) => ({
    id: index,
    path: `/image/${filename}`,
    aspectRatio: 1,
    type: "image" as const,
  }));

  const baseId = images.length;
  const videos: ImageItem[] = videoFiles.map((filename, index) => ({
    id: baseId + index,
    path: `/video/${filename}`,
    aspectRatio: 16 / 9,
    type: "video" as const,
  }));

  return [...images, ...videos];
}
