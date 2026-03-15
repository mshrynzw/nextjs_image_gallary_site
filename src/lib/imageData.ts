/**
 * ギャラリー用の型・定数
 * メディア一覧は public/image と public/video を参照（getMediaList 使用）
 */
export const IMAGES_PER_PAGE = 12;

export type MediaType = "image" | "video";

export interface ImageItem {
  id: number;
  path: string;
  aspectRatio: number;
  type: MediaType;
}
