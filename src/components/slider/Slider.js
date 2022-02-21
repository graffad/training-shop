import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation, Controller, Thumbs } from "swiper";
import { useState } from "react";
import { ReactComponent as Arrow } from "../../images/arr-left.svg";

SwiperCore.use([Pagination, Navigation, Controller, Thumbs]);

export default function Slider({ slides = [], showImgNav = false }) {
  const [sliderNavImages, setSliderNavImages] = useState(null);
  // const [sliderOne, setSliderOne] = useState(null);

  return (
    <>
      {showImgNav ? (
        <div className="slider-aside-wrapper">
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
          <Swiper
            onSwiper={setSliderNavImages}
            slidesPerView="auto"
            spaceBetween={16}
            className="slider-aside"
            direction="vertical"
            // navigation={{
            //   prevEl: ".slider-button--top",
            //   nextEl: ".slider-button--bottom",
            //   disabledClass: "slider-button--disabled",
            // }}
            // controller={{control:sliderOne}}
            // breakpoints={{
            //   450: {
            //     direction: "vertical",
            //   },
            // }}
          >
            {slides.map((item) => (
              <SwiperSlide key={item.id} className="slider-aside__item">
                <img src={item.img} alt="" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        ""
      )}

      <Swiper
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSwiper={setSliderOne}
        className="slider"
        navigation={{
          prevEl: ".slider-slide-prev",
          nextEl: ".slider-slide-next",
          disabledClass: "slider-button--disabled",
        }}
        // controller={{control:sliderNavImages}}
        thumbs={{
          swiper: sliderNavImages,
          slideThumbActiveClass: "slider-aside__item--active",
        }}
        watchSlidesProgress
      >
        {slides.map((item) => (
          <SwiperSlide key={item.id} className="slider__item">
            <img src={item.img} alt="" />
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
