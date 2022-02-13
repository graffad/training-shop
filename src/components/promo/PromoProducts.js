import { useNavigate } from "react-router-dom";
import Products from "../products/Products";

export default function PromoProducts({ productType }) {
  const navigate = useNavigate();

  const catName = () => {
    switch (productType) {
      case "women":
        return "WOMEN’S";
      case "men":
        return "MEN’S";
      default:
        return "";
    }
  };
  // input name issue with tracking - should be static/dynamic ?
  // problem with static

  return (
    <section className="promo-products-outer">
      <div className="container">
        <div className="promo-products-inner">
          <h2 className="promo-products-inner-header">{catName()}</h2>
          <div className="promo-products-inner-filters">
            <input
              type="radio"
              name={`${productType}-promo-filter`}
              className="promo-products-inner-filters__radio"
              id={`${productType}-r1`}
              defaultChecked
            />
            <label
              htmlFor={`${productType}-r1`}
              className="promo-products-inner-filters__label"
            >
              NEW ARRIVALS
            </label>
            <input
              type="radio"
              name={`${productType}-promo-filter`}
              className="promo-products-inner-filters__radio"
              id={`${productType}-r2`}
            />
            <label
              htmlFor={`${productType}-r2`}
              className="promo-products-inner-filters__label"
            >
              SPECIALS
            </label>
            <input
              type="radio"
              name={`${productType}-promo-filter`}
              className="promo-products-inner-filters__radio"
              id={`${productType}-r3`}
            />
            <label
              htmlFor={`${productType}-r3`}
              className="promo-products-inner-filters__label"
            >
              BESTSELLERS
            </label>
            <input
              type="radio"
              name={`${productType}-promo-filter`}
              className="promo-products-inner-filters__radio"
              id={`${productType}-r4`}
            />
            <label
              htmlFor={`${productType}-r4`}
              className="promo-products-inner-filters__label"
            >
              MOST VIEWED
            </label>
            <input
              type="radio"
              name={`${productType}-promo-filter`}
              className="promo-products-inner-filters__radio"
              id={`${productType}-r5`}
            />
            <label
              htmlFor={`${productType}-r5`}
              className="promo-products-inner-filters__label"
            >
              FEATURED PRODUCTS
            </label>
          </div>
        </div>
      </div>
      <Products productType={productType} />
      <div className="container">
        <button
          type="button"
          className="promo-products-link-button"
          onClick={() => {
            navigate(`/${productType}`);
          }}
        >
          See All
        </button>
      </div>
    </section>
  );
}
