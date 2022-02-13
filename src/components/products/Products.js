import { Link } from "react-router-dom";
import { womenCl, menCl, } from "../constants/constants";
import ProductsFilters from "./ProductsFilters";
import Pagination from "../Pagination";
import StarsRate from "./StarsRate";

export default function Products({
  productType,
  showFilters = false,
  pagination = false,
  limit = 0,
}) {
  // static array of products
  const data = () => {
    switch (productType) {
      case "women":
        return womenCl;
      case "men":
        return menCl;
      default:
        return [];
    }
  };
  // temp limit for related prod slider
  const arr = () => {
    if (limit === 0) {
      return data();
    }
    return data().slice(0, limit);
  };
  return (
    <section className="products-outer" data-test-id={`clothes-${productType}`}>
      <div className="container">
        {showFilters ? <ProductsFilters /> : ""}
        <div className="products-inner">
          {arr().map((item, index) => (
            <Link
              to={`/${productType}/${item.id}`}
              key={item.id}
              className="products-inner-card"
              data-test-id={`clothes-card-${productType}`}
            >
              {item.discount ? (
                <div className="products-inner-card__discount">{`-${item.discount}%`}</div>
              ) : (
                ""
              )}
              <div className="products-inner-card__image">
                {/* !!!!!!!!!!!!!!!!!!!!!!!temporary img require!!!!!!!!!!!!!!!!!!!!! */}
                {/* eslint-disable-next-line global-require,import/no-dynamic-require */}
                <img src={require(`${item.img}`)} alt="" />
              </div>
              <div className="products-inner-card__title">{item.title}</div>
              <div className="products-inner-card__price">
                {`$ ${item.price.toFixed(2)}`}
                {item.oldPrice ? (
                  <span className="products-inner-card__price--old">{`$ ${item.oldPrice.toFixed(
                    2
                  )}`}</span>
                ) : (
                  ""
                )}

                <div className="products-inner-card__rate">
                  <StarsRate rate={item.rate} />
                </div>
              </div>
            </Link>
          ))}
        </div>
        {pagination ? <Pagination /> : ""}
      </div>
    </section>
  );
}
