import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { fetchProductDetail } from "~/services/productService";
import {
  mapProductDetailToViewData,
  ProductDetailViewData,
} from "~/viewmodels/productViewModel";
import { useState, useEffect } from "react";
import { Typography, Image, Tag, Rate, Segmented, Divider, Spin } from "antd";

const { Title, Text } = Typography;

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params;
  if (!id) {
    throw new Error("Code param is missing");
  }

  const productUrl = `https://mock.akakce.dev/product${id}.json`;
  const detailData = await fetchProductDetail(productUrl);
  const viewData = mapProductDetailToViewData(detailData);
  return viewData;
};

function formatPrice(priceStr: string): string {
  return priceStr;
}

export default function ProductDetailPage() {
  const product = useLoaderData<ProductDetailViewData>();

  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDataLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (!dataLoaded) {
    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: 600, margin: "0 auto" }}>
      <Text type="secondary" style={{ fontSize: "14px" }}>
        {product.brand}
      </Text>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Title level={3} style={{ marginBottom: 0 }}>
          {product.title}
        </Title>

        <Rate
          disabled
          defaultValue={product.rating}
          count={5}
          style={{ fontSize: "16px" }}
        />
      </div>

      {product.badge && (
        <Tag
          color="yellow"
          style={{ color: "#444", borderRadius: "4px", fontSize: "12px" }}
        >
          {product.badge}
        </Tag>
      )}

      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <Image
          src={product.imageUrl}
          alt={product.title}
          height={200}
          style={{ objectFit: "contain" }}
          preview={false}
        />
      </div>

      <Text style={{ fontWeight: "bold" }}>Kapasite seçenekleri:</Text>
      <div style={{ margin: "10px 0" }}>
        <Segmented options={product.storageOptions} />
      </div>

      <Divider />

      <Text
        type="secondary"
        style={{ fontSize: "14px", display: "block", marginBottom: "8px" }}
      >
        {product.countOfPrices} satıcı içinde kargo dahil en ucuz fiyat seçeneği
      </Text>

      <Title level={2} style={{ margin: 0 }}>
        {formatPrice(product.formattedPrice)}
      </Title>

      {product.freeShipping && (
        <Text style={{ color: "green", display: "block", margin: "4px 0" }}>
          Ücretsiz kargo
        </Text>
      )}

      <Text type="secondary" style={{ fontSize: "12px" }}>
        Son güncelleme: {product.lastUpdate}
      </Text>
    </div>
  );
}
