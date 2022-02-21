import { Link } from "react-router-dom";
import { womenCl, menCl, data } from "../constants/constants";
import ProductsFilters from "./ProductsFilters";
import Pagination from "../Pagination";
import StarsRate from "./StarsRate";

export default function Products({
  productType,
  showFilters = false,
  pagination = false,
  limit = 0,
}) {
  const arr = () => {
    if (limit === 0) {
      return data(productType);
    }
    return data(productType).slice(0, limit);
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
                <img src={`${process.env.PUBLIC_URL}/${item.img}`} alt="" />
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
