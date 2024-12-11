import { PageResponse, ProductDetail } from "~/types/types";

export interface ProductListItemView {
  code: number;
  title: string;
  imageUrl: string;
  price: number;
  dropRatio: number;
  countOfPrices: number;
  followCount: number;
  url: string;
}

export interface ProductListViewData {
  horizontalProducts: ProductListItemView[];
  verticalProducts: ProductListItemView[];
  nextUrl: string | null;
}

export interface ProductDetailViewData {
  code?: number;
  brand: string;
  title: string;
  badge: string;
  imageUrl: string;
  formattedPrice: string;
  rating: number;
  storageOptions: string[];
  countOfPrices: number;
  freeShipping: boolean;
  lastUpdate: string;
}

export function mapPageResponseToViewData(
  data: PageResponse
): ProductListViewData {
  return {
    horizontalProducts:
      data.horizontalProductList?.map((p) => ({
        code: p.code,
        title: p.name,
        imageUrl: p.imageUrl,
        price: p.price,
        dropRatio: p.dropRatio,
        countOfPrices: p.countOfPrices,
        followCount: p.followCount,
        url: p.url,
      })) || [],
    verticalProducts:
      data.productList?.map((p) => ({
        code: p.code,
        title: p.name,
        imageUrl: p.imageUrl,
        price: p.price,
        dropRatio: p.dropRatio,
        countOfPrices: p.countOfPrices,
        followCount: p.followCount,
        url: p.url,
      })) || [],
    nextUrl: data.nextUrl,
  };
}

export function mapProductDetailToViewData(
  detail: ProductDetail
): ProductDetailViewData {
  const formattedPrice = `${detail.price} TL`;

  return {
    code: detail.code,
    brand: detail.mkName,
    title: detail.productName,
    badge: detail.badge,
    imageUrl: detail.imageUrl,
    formattedPrice,
    rating: detail.rating,
    storageOptions: detail.storageOptions,
    countOfPrices: detail.countOfPrices,
    freeShipping: detail.freeShipping,
    lastUpdate: detail.lastUpdate,
  };
}
