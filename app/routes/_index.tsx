import { LoaderFunction } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { fetchPageData } from "~/services/productService";
import {
  mapPageResponseToViewData,
  ProductListViewData,
} from "~/viewmodels/productViewModel";
import { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Image,
  Typography,
  Tag,
  Carousel,
  Spin,
  Pagination,
} from "antd";

const { Meta } = Card;
const { Text } = Typography;

export const loader: LoaderFunction = async () => {
  const data = await fetchPageData();
  const viewData = mapPageResponseToViewData(data);
  return viewData;
};

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 2,
  })
    .format(price)
    .replace("TRY", "TL");
}

function formatFollowCount(count: number): string {
  if (count >= 1000) {
    const thousands = Math.floor(count / 1000);
    return `${thousands}.000+ takip`;
  }
  return `${count} takip`;
}

export default function Index() {
  const initialViewData = useLoaderData<ProductListViewData>();
  const [horizontalProducts] = useState(initialViewData.horizontalProducts);
  const [verticalProducts, setVerticalProducts] = useState(
    initialViewData.verticalProducts
  );
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = verticalProducts.length;

  const totalPages = 3;
  const totalItems = totalPages * pageSize;

  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDataLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  async function handlePageChange(page: number) {
    setLoading(true);
    setCurrentPage(page);
    try {
      const newData = await fetchPageData(
        `https://mock.akakce.dev/page.json?page=${page}`
      );
      const viewData = mapPageResponseToViewData(newData);
      setVerticalProducts(viewData.verticalProducts);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

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
    <div
      style={{
        padding: "20px",
        maxWidth: 1200,
        margin: "0 auto",
        paddingTop: "50px",
      }}
    >
      {horizontalProducts.length > 1 && (
        <div style={{ marginBottom: "40px", paddingBottom: "40px" }}>
          <Carousel
            dots={true}
            infinite={false}
            slidesToShow={1}
            slidesToScroll={1}
            style={{ margin: "0 auto", color: "red" }}
          >
            {horizontalProducts.map((product) => (
              <div key={product.code}>
                <Card
                  hoverable
                  style={{
                    width: 700,
                    margin: "0 auto",
                    position: "relative",
                    paddingBottom: "40px",
                  }}
                  cover={
                    <Link to={`/product/${product.code}`}>
                      <div style={{ position: "relative" }}>
                        {product.dropRatio && (
                          <Tag
                            style={{
                              position: "absolute",
                              top: 8,
                              left: 8,
                              borderRadius: "50%",
                              backgroundColor: "#ff4d4f",
                              color: "#fff",
                              fontWeight: "bold",
                              fontSize: "12px",
                              width: "32px",
                              height: "32px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              zIndex: 1,
                            }}
                          >
                            %{product.dropRatio}
                          </Tag>
                        )}
                        <Image
                          src={product.imageUrl}
                          alt={product.title}
                          height={200}
                          width="100%"
                          style={{ objectFit: "contain", padding: "20px 0px" }}
                          preview={false}
                        />
                      </div>
                    </Link>
                  }
                >
                  <Link
                    to={`/product/${product.code}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Meta
                      title={
                        <Text
                          strong
                          style={{ fontSize: "16px", color: "#444" }}
                        >
                          {product.title}
                        </Text>
                      }
                      description={
                        <div style={{ marginTop: "8px" }}>
                          <Text
                            strong
                            style={{ fontSize: "20px", color: "#000" }}
                          >
                            {formatPrice(product.price)}
                          </Text>
                          <div style={{ color: "#888", fontSize: "14px" }}>
                            {product.countOfPrices} satıcı &gt;
                          </div>
                          <div style={{ color: "#888", fontSize: "14px" }}>
                            {formatFollowCount(product.followCount)}
                          </div>
                        </div>
                      }
                    />
                  </Link>
                </Card>
              </div>
            ))}
          </Carousel>
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: "center", margin: "50px 0" }}>
          <Spin size="large" />
        </div>
      ) : (
        <Row gutter={[16, 16]}>
          {verticalProducts.map((product) => (
            <Col key={product.code} xs={24} sm={12}>
              <Card
                hoverable
                style={{ position: "relative" }}
                cover={
                  <Link to={`/product/${product.code}`}>
                    <div style={{ position: "relative" }}>
                      {product.dropRatio && (
                        <Tag
                          style={{
                            position: "absolute",
                            top: 8,
                            left: 8,
                            borderRadius: "50%",
                            backgroundColor: "#ff4d4f",
                            color: "#fff",
                            fontWeight: "bold",
                            fontSize: "12px",
                            width: "32px",
                            height: "32px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          %{product.dropRatio}
                        </Tag>
                      )}
                      <Image
                        src={product.imageUrl}
                        alt={product.title}
                        height={150}
                        width="100%"
                        style={{ objectFit: "contain", padding: "20px 0px" }}
                        preview={false}
                      />
                    </div>
                  </Link>
                }
              >
                <Link
                  to={`/product/${product.code}`}
                  style={{ textDecoration: "none" }}
                >
                  <Meta
                    title={<Text strong>{product.title}</Text>}
                    description={
                      <div>
                        <Text style={{ fontSize: "16px", fontWeight: "bold" }}>
                          {formatPrice(product.price)}
                        </Text>
                        <div style={{ fontSize: "12px", color: "#888" }}>
                          {product.countOfPrices} satıcı &gt;
                        </div>
                        <div style={{ fontSize: "12px", color: "#888" }}>
                          {formatFollowCount(product.followCount)}
                        </div>
                      </div>
                    }
                  />
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Pagination */}
      <div
        style={{
          display: "flex",
          marginTop: "20px",
          justifyContent: "center",
        }}
      >
        <Pagination
          current={currentPage}
          total={totalItems}
          pageSize={pageSize}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
}
