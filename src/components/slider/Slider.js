import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation, Controller, Thumbs } from "swiper";
import { useState } from "react";
import { ReactComponent as Arrow } from "../../images/arr-left.svg";

SwiperCore.use([Pagination, Navigation, Controller, Thumbs]);

export default function Slider({
  slides = [],
  showImgNav = false,
  discount = null,
}) {
  const [sliderNavImages, setSliderNavImages] = useState(null);
  return (
    <>
      {showImgNav ? (
        <div className="slider-aside-wrapper">
          <div className="slider-aside-nav">
            <button
              type="button"
              className="slider-button--top"
              onClick={() => {
                document.querySelector(".slider-slide-prev").click();
              }}
            >
              <Arrow />
            </button>
            <button
              type="button"
              className="slider-button--bottom"
              onClick={() => {
                document.querySelector(".slider-slide-next").click();
              }}
            >
              <Arrow />
            </button>
          </div>

          <Swiper
            onSwiper={setSliderNavImages}
            spaceBetween={12}
            className="slider-aside"
            breakpoints={{
              360: {
                slidesPerView: 4,
                direction: "horizontal",
              },
              450: {
                direction: "vertical",
                slidesPerView: 4,
              },
            }}
          >
            {slides.map((item) => (
              <SwiperSlide key={item.id} className="slider-aside__item">
                <div className="slider-aside__image-wrapper">
                  <img
                    src={`https://training.cleverland.by/shop/${item.url}`}
                    alt=""
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        ""
      )}

      <Swiper
        slidesPerView={1}
        className="slider"
        navigation={{
          prevEl: ".slider-slide-prev",
          nextEl: ".slider-slide-next",
          disabledClass: "slider-button--disabled",
        }}
        thumbs={{
          swiper: sliderNavImages,
          slideThumbActiveClass: "slider-aside__item--active",
        }}
        watchSlidesProgress
      >
        {slides.map((item) => (
          <SwiperSlide key={item.id} className="slider__item">
            {discount ? (
              <span className="slider-discount products-inner-card__discount">
                {discount}
              </span>
            ) : (
              ""
            )}
            <img
              src={
                item.banner
                  ? item.img
                  : `https://training.cleverland.by/shop/${item.url}`
              }
              alt=""
            />
            {item.banner ? (
              <div className="slider-banner">
                <p className="slider-banner__header">{item.banner.header}</p>
                <p className="slider-banner__text">{item.banner.text}</p>
              </div>
            ) : (
              ""
            )}
          </SwiperSlide>
        ))}
        <button
          type="button"
          className="slider-slide-prev slider-button slider-button--left"
        >
          <Arrow />
        </button>
        <button
          type="button"
          className="slider-slide-next slider-button slider-button--right"
        >
          <Arrow />
        </button>
      </Swiper>
    </>
  );
}
