import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import TopInfo from "../components/info/TopInfo";
import StarsRate from "../components/products/StarsRate";
import ProductProfile from "../components/products/ProductProfile";
import PRODUCTS from "../components/constants/productsData";
import { ReactComponent as Arrow } from "../images/arr-left.svg";
import SliderRelatedProducts from "../components/slider/SliderRelatedProducts";
import { clothes } from "../components/constants/constants";

export default function ProductPage(props) {
  const params = useParams();
  const productData = PRODUCTS[params.category]?.filter(
    (item) => item.id === params.id
  )[0];

  return (
    <Layout>
      <div data-test-id={`product-page-${params.category}`}>
        <TopInfo params={params} productData={productData} />
        <section className="top-info-product-outer">
          <div className="container">
            <div className="top-info-product-inner">
              <div className="top-info-product-inner__rate">
                <StarsRate rate={productData.rating} />{" "}
                <span>{productData.reviews.length} Reviews</span>
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
        <ProductProfile params={params} productData={productData} />
        <section
          className="product-profile-related-outer"
          data-test-id="related-slider"
        >
          <div className="container">
            <div className="product-profile-related-inner">
              <h2 className="product-profile-related-inner__header">
                RELATED PRODUCTS
              </h2>
              <div className="product-profile-related-inner__slider-controls">
                <button
                  type="button"
                  className="slider-related-button slider-related-button--prev"
                >
                  <Arrow />
                </button>
                <button
                  type="button"
                  className="slider-related-button slider-related-button--next"
                >
                  <Arrow />
                </button>
              </div>
            </div>
            <SliderRelatedProducts
              slides={clothes(params.category)}
              productType={params.category}
            />
          </div>
        </section>
      </div>
    </Layout>
  );
}
