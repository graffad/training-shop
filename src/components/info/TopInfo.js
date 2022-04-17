import { Link } from "react-router-dom";
import classNames from "classnames";
import { ReactComponent as Share } from "../../images/share.svg";
import StarsRate from "../products/StarsRate";

export default function TopInfo({ params, productData }) {
  return (
    <>
      <section className="top-info">
        <div className="container">
          <div className="top-info__breadcrumbs">
            <Link to="/">Home</Link>
            <Link
              to={`/${params.category}`}
              style={{ textTransform: "capitalize" }}
            >
              &nbsp; ► {params.category}
            </Link>

            {params.id ? (
              <Link to={`/${params.category}/${params.id}`}>
                &nbsp; ► {productData?.name}
              </Link>
            ) : (
              ""
            )}
            <p className="top-info__share share">
              <span>
                <Share />
              </span>
              Share
            </p>
          </div>
          <h1
            className={classNames("top-info__title", {
              "top-info__title--big": params.id,
            })}
          >
            {params.id ? productData?.name : params.category}
          </h1>
        </div>
      </section>
      {productData ? (
        <section className="top-info-product-outer">
          <div className="container">
            <div className="top-info-product-inner">
              <div className="top-info-product-inner__rate">
                <StarsRate rate={productData.rating} />{" "}
                <span>{productData.reviews?.length} Reviews</span>
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
      ) : (
        ""
      )}
    </>
  );
}
