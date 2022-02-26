import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import { Link } from "react-router-dom";
import StarsRate from "../products/StarsRate";

SwiperCore.use([Navigation]);

export default function SliderRelatedProducts({
  slides = [],
  productType = "",
}) {
  // problems with img fit with max-hw
  return (
    <Swiper
      // slidesPerView="auto"
      className="slider-related"
      spaceBetween={30}
      navigation={{
        prevEl: ".slider-related-button--prev",
        nextEl: ".slider-related-button--next",
        disabledClass: "slider-button--disabled",
      }}
      breakpoints={{
        360: {
          slidesPerView: 1,
        },
        600: {
          slidesPerView: 2,
        },
        850: {
          slidesPerView: 3,
        },
        1100: {
          slidesPerView: 4,
        },
      }}
    >
      {slides.map((item) => (
        <SwiperSlide key={item.id} className="slider-related__item">
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
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
