export interface HorizontalProduct {
  code: number;
  name: string;
  imageUrl: string;
  dropRatio: number;
  price: number;
  countOfPrices: number;
  followCount: number;
  url: string;
}

export interface VerticalProduct {
  code: number;
  name: string;
  imageUrl: string;
  dropRatio: number;
  price: number;
  countOfPrices: number;
  followCount: number;
  url: string;
}

export interface PageResponse {
  horizontalProductList: HorizontalProduct[];
  productList: VerticalProduct[];
  nextUrl: string | null;
}

export interface ProductDetail {
  code: number;
  mkName: string;
  productName: string;
  badge: string;
  imageUrl: string;
  price: number;
  rating: number;
  storageOptions: string[];
  countOfPrices: number;
  freeShipping: boolean;
  lastUpdate: string;
}
