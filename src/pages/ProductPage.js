import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import TopInfo from "../components/info/TopInfo";
import StarsRate from "../components/products/StarsRate";
import ProductProfile from "../components/products/ProductProfile";

export default function ProductPage(props) {
  const params = useParams();
  return (
    <Layout>
      <div data-test-id={`product-page-${params.category}`}>
        <TopInfo
          params={params}
          productData={{ title: "Women's tracksuit Q109" }}
        />
        <section className="top-info-product-outer">
          <div className="container">
            <div className="top-info-product-inner">
              <div className="top-info-product-inner__rate">
                <StarsRate rate={5} /> <span>2 Reviews</span>
              </div>
              <p className="top-info-product-inner__text">
                SKU: <span>777</span>{" "}
              </p>
              <p className="top-info-product-inner__text">
                Availability: <span>In Stock</span>
              </p>
            </div>
          </div>
        </section>
        <ProductProfile params={params} />
      </div>
    </Layout>
  );
}
