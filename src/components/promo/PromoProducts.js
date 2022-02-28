import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Products from "../products/Products";
import { PROMO_FILTERS } from "../constants/constants";

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

  const [filterPromo, setFilterPromo] = useState("isNewArrivals");

  return (
    <section className="promo-products-outer">
      <div className="container">
        <div className="promo-products-inner">
          <h2 className="promo-products-inner-header">{catName()}</h2>
          <div className="promo-products-inner-filters">
            {PROMO_FILTERS.map((item, index) => (
              <label
                className="promo-products-inner-filters__label"
                key={`${productType}${item.particularName}`}
                data-test-id={`clothes-${productType}-${item.particularName}`}
              >
                <input
                  type="radio"
                  name={`${productType}-promo-filter`}
                  className="promo-products-inner-filters__radio"
                  id={`${productType} ${item.name}`}
                  value={item.particularName}
                  defaultChecked={index === 0}
                  onChange={(event) => setFilterPromo(event.target.value)}
                />
                <span>{item.name}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
      <Products productType={productType} limit={8} filterPromo={filterPromo} />
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
