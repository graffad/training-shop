import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Layout from "../components/Layout";
import TopInfo from "../components/info/TopInfo";
import ProductProfile from "../components/products/ProductProfile";
import { ReactComponent as Arrow } from "../images/arr-left.svg";
import SliderRelatedProducts from "../components/slider/SliderRelatedProducts";
import {
  reduxGetProductProfile,
  reduxGetProductsDiff,
} from "../redux/reducers/productsSlice";
import Loader from "../components/loader/Loader";
import Alert from "../components/Alert";
import ModalReview from "../components/modals/ModalReview";

export default function ProductPage() {
  const dispatch = useDispatch();
  const { productData, products } = useSelector((state) => state.productsState);
  const { isLoading, isError, isLoadingProfile, isErrorProfile } = useSelector(
    (state) => state.productsState
  );
  const params = useParams();

  useEffect(() => {
    if (!productData || productData.id !== params.id) {
      dispatch(reduxGetProductProfile(params.id));
    }
      dispatch(reduxGetProductsDiff(params.category));
  }, [params]);

  return (
    <Layout>
      {isError ? <Alert errorMessage={isError} /> : ""}
      <div data-test-id={`product-page-${params.category}`}>
        {/* eslint-disable-next-line no-nested-ternary */}
        {isLoadingProfile ? (
          <Loader />
        ) : isErrorProfile ? (
          <Alert errorMessage={isErrorProfile} isProfile />
        ) : (
          <>
            <TopInfo params={params} productData={productData} />
            <ProductProfile params={params} productData={productData} />
          </>
        )}

        {!isLoading ? (
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
                slides={products[`${params.category}`]}
                productType={params.category}
              />
            </div>
          </section>
        ) : (
          <Loader />
        )}
      </div>
      <ModalReview/>
    </Layout>
  );
}
