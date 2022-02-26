import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { clothes } from "../constants/constants";
import ProductsFilters from "./ProductsFilters";
import Pagination from "../Pagination";
import StarsRate from "./StarsRate";

export default function Products({
  productType,
  showFilters = false,
  pagination = false,
  limit = undefined,
  filterPromo = null,
}) {
  const [products, setProducts] = useState([]);

  function filterByParticulars(prod) {
    return prod.filter((item) => item.particulars[filterPromo]);
  }
  useEffect(() => {
    if (filterPromo !== null) {
      setProducts(filterByParticulars(clothes(productType)).slice(0, limit));
    } else setProducts(clothes(productType).slice(0,limit));
  }, [filterPromo]);


  return (
    <section className="products-outer" data-test-id={`clothes-${productType}`}>
      <div className="container">
        {showFilters ? <ProductsFilters /> : ""}
        <div className="products-inner">
          {products.map((item, index) => (
            <Link
              to={`/${productType}/${item.id}`}
              key={item.id}
              className="products-inner-card"
              data-test-id={`clothes-card-${productType}`}
            >
              {item.discount ? (
                <div className="products-inner-card__discount">
                  {item.discount}
                </div>
              ) : (
                ""
              )}
              <div className="products-inner-card__image">
                <img
                  src={`https://training.cleverland.by/shop/${item.images[0].url}`}
                  alt=""
                />
              </div>
              <div className="products-inner-card__title">{item.name}</div>
              <div className="products-inner-card__price">
                {`$ ${item.price.toFixed(2)}`}
                {/* {item.oldPrice ? ( */}
                {/*  <span className="products-inner-card__price--old">{`$ ${item.oldPrice.toFixed( */}
                {/*    2 */}
                {/*  )}`}</span> */}
                {/* ) : ( */}
                {/*  "" */}
                {/* )} */}
                <div className="products-inner-card__rate">
                  <StarsRate rate={item.rating} />
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
