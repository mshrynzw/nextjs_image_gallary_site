import fs from "fs";
import path from "path";
import type { ImageItem } from "./imageData";

const IMAGE_DIR = path.join(process.cwd(), "public", "image");
const EXTENSIONS = [".jpg", ".jpeg", ".png", ".gif", ".webp"];

/**
 * public/image 内の画像ファイル一覧を取得（ビルド時・サーバー専用）
 * .jpg, .jpeg, .png, .gif, .webp をファイル名でソートして返す
 */
export function getImageList(): ImageItem[] {
  if (!fs.existsSync(IMAGE_DIR)) {
    return [];
  }
  const files = fs
    .readdirSync(IMAGE_DIR)
    .filter((f) =>
      EXTENSIONS.includes(path.extname(f).toLowerCase())
    )
    .sort();
  return files.map((filename, index) => ({
    id: index,
    path: `/image/${filename}`,
    aspectRatio: 1,
  }));
}
