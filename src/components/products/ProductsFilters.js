import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ReactComponent as FilterSvg } from "./icons/filter.svg";
import { ReactComponent as DspLine } from "./icons/dsp-line.svg";
import { ReactComponent as DspSquare } from "./icons/dsp-square.svg";

export default function ProductsFilters({
  FILTERS,
  selectedFilters,
  setSelectedFilters,
  itemsFound,
  productType,
}) {
  const location = useLocation();
  const [isShow, setIsShow] = useState(false);
  const [isFilterBtnActive, setIsFilterBtnActive] = useState(false);

  function renderSelectedFilter(filters, name) {
    return filters.map((item) => (
      <p
        key={item}
        className="products-filters-description__item"
      >{`${name}: ${item} `}</p>
    ));
  }

  // ▼ fix for uncheck input after link
  useEffect(() => {
    const checkboxArr = [
      ...document.querySelectorAll(".products-filters-column__item-input"),
    ];
    // eslint-disable-next-line no-return-assign,no-param-reassign
    checkboxArr.forEach((item) => (item.checked = false));
  }, [location]);
  function changeFilter(key, target) {
    // add filter to array of it type
    if (target.checked) {
      setSelectedFilters({
        ...selectedFilters,
        [key]: [...selectedFilters[key], target.value],
      });
    }
    // remove filter from array of it type
    else {
      const newValue = selectedFilters[key].filter((el) => el !== target.value);
      setSelectedFilters({
        ...selectedFilters,
        [key]: newValue,
      });
    }
  }

  return (
    <>
      <div className="products-controls-wrapper">
        <button
          type="button"
          className={`products-controls-button filters-control ${
            isFilterBtnActive ? "filters-control--active" : ""
          }`}
          onClick={() => {
            setIsShow(!isShow);
            setIsFilterBtnActive(!isFilterBtnActive);
          }}
          data-test-id="filter-button"
        >
          <span>
            <FilterSvg />
          </span>
          FILTER
        </button>

        <label className="products-controls-button display-switcher">
          <input
            className="products-controls-input"
            type="radio"
            name="display"
            id="dsp-line"
          />
          <DspLine />
        </label>

        <label className="products-controls-button display-switcher">
          <input
            className="products-controls-input"
            type="radio"
            name="display"
            id="dsp-square"
            defaultChecked
          />
          <DspSquare />
        </label>
      </div>
      <div
        className={`products-filters-wrapper ${
          isShow ? "products-filters-wrapper--active" : ""
        }`}
        data-test-id={`filters-${productType}`}
      >
        <div className="products-filters-column-wrapper">
          <h4 className="products-filters-column-header">COLOR</h4>
          <ul className="products-filters-column" data-test-id="filters-color">
            {FILTERS.colors.map((color, index) => (
              <li key={color} className="products-filters-column__item">
                <input
                  className="products-filters-column__item-input"
                  type="checkbox"
                  name="color"
                  id={color}
                  value={color}
                  data-test-id={`filter-color-${color}`}
                  onChange={(event) => {
                    changeFilter("colors", event.target);
                  }}
                />
                <label
                  className="products-filters-column__item-label"
                  htmlFor={color}
                >
                  {color}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="products-filters-column-wrapper">
          <h4 className="products-filters-column-header">SIZE</h4>
          <ul className="products-filters-column" data-test-id="filters-size">
            {FILTERS.sizes.map((size) => (
              <li key={size} className="products-filters-column__item">
                <input
                  className="products-filters-column__item-input"
                  type="checkbox"
                  value={size}
                  id={size}
                  data-test-id={`filter-size-${size}`}
                  name="size"
                  onChange={(event) => {
                    changeFilter("sizes", event.target);
                  }}
                />
                <label
                  className="products-filters-column__item-label"
                  htmlFor={size}
                >
                  {size}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="products-filters-column-wrapper">
          <h4 className="products-filters-column-header">BRAND</h4>
          <ul className="products-filters-column" data-test-id="filters-brand">
            {FILTERS.brands.map((brand) => (
              <li key={brand} className="products-filters-column__item">
                <input
                  className="products-filters-column__item-input"
                  type="checkbox"
                  value={brand}
                  id={brand}
                  name="brand"
                  data-test-id={`filter-brand-${brand}`}
                  onChange={(event) => {
                    changeFilter("brands", event.target);
                  }}
                />
                <label
                  className="products-filters-column__item-label"
                  htmlFor={brand}
                >
                  {brand}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="products-filters-column-wrapper">
          <h4 className="products-filters-column__header">PRICE</h4>
          <ul className="products-filters-column">
            {FILTERS.price.map((price) => (
              <li key={price.min} className="products-filters-column__item">
                <input
                  className="products-filters-column__item-input"
                  type="checkbox"
                  value={JSON.stringify(price)}
                  id={price.min}
                  name="price"
                  onChange={(event) => {
                    changeFilter("price", event.target);
                  }}
                />
                <label
                  className="products-filters-column__item-label"
                  htmlFor={price.min}
                >{`$${price.min}${
                  price.max < 99999 ? `-$${price.max}` : "+"
                }`}</label>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {Object.values(selectedFilters).some((arr) => arr.length !== 0) ? (
        <div className="products-filters-description">
          <p className="products-filters-description__result">
            {itemsFound} items found
          </p>
          {renderSelectedFilter(selectedFilters.colors, "Color")}
          {renderSelectedFilter(selectedFilters.sizes, "Size")}
          {renderSelectedFilter(selectedFilters.brands, "Brand")}
          {selectedFilters.price.map((item) => (
            <p key={item} className="products-filters-description__item">
              {`Price: $${JSON.parse(item).min}-$${JSON.parse(item).max}`}
            </p>
          ))}
        </div>
      ) : (
        ""
      )}
    </>
  );
}
