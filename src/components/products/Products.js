import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductsFilters from "./ProductsFilters";
import Pagination from "../Pagination";
import StarsRate from "./StarsRate";
import { reduxSetProductProfile } from "../../redux/reducers/productsSlice";

export default function Products({
  productType,
  showFilters = false,
  pagination = false,
  limit = undefined,
  filterPromo = null,
}) {
  const dispatch = useDispatch();
  const products = useSelector(
    (state) => state.productsState.products[`${productType}`]
  );

  // filters states
  const [filteredProducts, setFilteredProducts] = useState([]);
  const allSizesUniq = [
    ...new Set([...new Set(products?.map((p) => p.sizes))].flat()),
  ];
  const allColors = [...new Set(products?.map((p) => p.images))].flat();
  const allColorsUniq = [...new Set(allColors?.map((c) => c.color))];
  const allBrandsUniq = [...new Set(products?.map((p) => p.brand))];

  const FILTERS = {
    colors: allColorsUniq,
    sizes: allSizesUniq,
    brands: allBrandsUniq,
    price: [
      { min: 250, max: 99999 },
      { min: 200, max: 250 },
      { min: 150, max: 200 },
      { min: 100, max: 150 },
      { min: 50, max: 100 },
      { min: 0, max: 50 },
    ],
  };

  const [selectedFilters, setSelectedFilters] = useState({
    colors: [],
    sizes: [],
    brands: [],
    price: [],
  });

  function filterByParticulars(prod) {
    return prod?.filter((item) => item.particulars[filterPromo]);
  }
  useEffect(() => {
    // re init selected filters if change type
    setSelectedFilters({
      colors: [],
      sizes: [],
      brands: [],
      price: [],
    });
    if (filterPromo !== null) {
      setFilteredProducts(filterByParticulars(products)?.slice(0, limit));
    } else {
      setFilteredProducts(products?.slice(0, limit));
    }
  }, [filterPromo, productType, products]);

  useEffect(() => {
    // init array and if no filters enabled + avoid promo
    if (filterPromo === null) {
      setFilteredProducts(products?.slice(0, limit));
    }

    // filter by many conditions + check length for fix global cond &&
    const newProd = products?.filter(
      (prod) =>
        // for filter By Color
        (selectedFilters.colors.length > 0
          ? prod.images.some((img) =>
              selectedFilters.colors.includes(img.color)
            )
          : true) &&
        // fro filter by size
        (selectedFilters.sizes.length > 0
          ? prod.sizes.find((sz) =>
              selectedFilters.sizes.some((el) => el === sz)
            )
          : true) &&
        // for filter by brand
        (selectedFilters.brands.length > 0
          ? selectedFilters.brands.some((brand) => brand === prod.brand)
          : true) &&
        (selectedFilters.price.length > 0
          ? selectedFilters.price.some(
              (pr) =>
                prod.price >= JSON.parse(pr).min &&
                prod.price <= JSON.parse(pr).max
            )
          : true)
    );
    // if some filter enabled
    // eslint-disable-next-line no-restricted-syntax
    for (const i in selectedFilters) {
      if (selectedFilters[i].length !== 0) {
        setFilteredProducts(newProd);
      }
    }
  }, [selectedFilters, products]);
  return (
    <section className="products-outer" data-test-id={`clothes-${productType}`}>
      <div className="container">
        {showFilters ? (
          <ProductsFilters
            FILTERS={FILTERS}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            itemsFound={filteredProducts?.length}
            productType={productType}
          />
        ) : (
          ""
        )}
        <div className="products-inner">
          {filteredProducts?.map((item, index) => (
            <Link
              to={`/${productType}/${item.id}`}
              key={item.id}
              className="products-inner-card"
              data-test-id={`clothes-card-${productType}`}
              onClick={() => dispatch(reduxSetProductProfile(item))}
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
