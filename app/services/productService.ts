import { PageResponse, ProductDetail } from "~/types/types";

export async function fetchPageData(
  url: string = "https://mock.akakce.dev/page.json"
): Promise<PageResponse> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch page data: ${res.statusText}`);
  }
  const data: PageResponse = await res.json();
  return data;
}

export async function fetchProductDetail(url: string): Promise<ProductDetail> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch product detail: ${res.statusText}`);
  }
  const data: ProductDetail = await res.json();
  return data;
}
