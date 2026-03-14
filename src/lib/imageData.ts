/**
 * ギャラリー用の型・定数
 * 画像一覧は public/image を参照するため、サーバーでは getImageList() を使用
 */
export const IMAGES_PER_PAGE = 12;

export interface ImageItem {
  id: number;
  path: string;
  aspectRatio: number;
}
