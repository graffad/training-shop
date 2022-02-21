import { ReactComponent as Arrow } from "../../images/arr-left.svg";
import { ReactComponent as Hook } from "./icons/hook.svg";
import { ReactComponent as Hart } from "./icons/hart.svg";
import { ReactComponent as Compare } from "./icons/compare.svg";
import { ReactComponent as Truck } from "../../images/truck.svg";
import { ReactComponent as Returns } from "../../images/return.svg";
import { ReactComponent as Mail } from "../../images/mail.svg";
import { ReactComponent as Cloud } from "../../images/cloud.svg";
import StarsRate from "./StarsRate";
import Slider from "../slider/Slider";
import c0 from "./tmp-prod/c0.png";
import c1 from "./tmp-prod/c1.png";
import c2 from "./tmp-prod/c2.png";
import c3 from "./tmp-prod/c3.png";
import stripe from "../../images/credit-cards/Stripe_x42.png";
import aes from "../../images/credit-cards/AES256_x42.png";
import paypal from "../../images/credit-cards/paypal_2_x42.png";
import visa from "../../images/credit-cards/visa_x42.png";
import mastercard from "../../images/credit-cards/mastercard_x42.png";
import discover from "../../images/credit-cards/discover_x42.png";
import american from "../../images/credit-cards/american-express_x42.png";
import { sliderProduct, data } from "../constants/constants";
import SliderRelatedProducts from "../slider/SliderRelatedProducts";

export default function ProductProfile({ params }) {
  return (
    <>
      <section className="product-profile-outer">
        <div className="container">
          <div className="product-profile-inner">
            <div
              className="product-profile-slider"
              data-test-id="product-slider"
            >
              <Slider slides={sliderProduct} showImgNav />
            </div>
            <div className="product-profile-right">
              <div className="product-profile-colors">
                <h4 className="product-profile-colors__header">
                  COLOR: <span>Blue</span>
                </h4>
                <div className="product-profile-colors__images-wrapper">
                  <div className="product-profile-colors__img">
                    <img src={c0} alt="" />
                  </div>
                  <div className="product-profile-colors__img">
                    <img src={c1} alt="" />
                  </div>
                  <div className="product-profile-colors__img">
                    <img src={c2} alt="" />
                  </div>
                  <div className="product-profile-colors__img">
                    <img src={c3} alt="" />
                  </div>
                </div>
              </div>
              <div className="product-profile-sizes">
                <h4 className="product-profile-sizes__header">
                  SIZE: <span> S</span>
                </h4>
                <div className="product-profile-sizes__variants-wrapper">
                  <div className="product-profile-sizes__variant">XS</div>
                  <div className="product-profile-sizes__variant product-profile-sizes__variant--active">
                    S
                  </div>
                  <div className="product-profile-sizes__variant">M</div>
                  <div className="product-profile-sizes__variant">L</div>
                </div>
                <div className="product-profile-sizes__guide">
                  <Hook />
                  <span>Size guide</span>
                </div>
              </div>
              <div className="product-profile-divider" />
              <div className="product-profile-controls">
                <div className="product-profile-controls__item product-profile-controls__price">
                  $ 379.99
                </div>
                <button
                  type="button"
                  className="product-profile-controls__item product-profile-controls__cart"
                >
                  ADD TO CART
                </button>
                <button
                  type="button"
                  className="product-profile-controls__item product-profile-controls__like"
                >
                  <Hart />
                </button>
                <button
                  type="button"
                  className="product-profile-controls__item product-profile-controls__compare"
                >
                  <Compare />
                </button>
              </div>
              <div className="product-profile-divider" />
              <div className="product-profile-delivery">
                <div className="product-profile-delivery__item">
                  <Truck />
                  <span>Shipping & Delivery</span>
                </div>

                <div className="product-profile-delivery__item">
                  <Returns />
                  <span>Returns & Exchanges</span>
                </div>

                <div className="product-profile-delivery__item">
                  <Mail />
                  <span>Ask a question</span>
                </div>
              </div>
              <div className="product-profile-cards">
                <p className="product-profile-cards-header">
                  guaranteed safe checkout
                </p>
                <div className="product-profile-cards-list">
                  <img src={stripe} alt="" />
                  <img src={aes} alt="" />
                  <img src={paypal} alt="" />
                  <img src={visa} alt="" />
                  <img src={mastercard} alt="" />
                  <img src={discover} alt="" />
                  <img src={american} alt="" />
                </div>
              </div>
              <div className="product-profile-divider" />
              <p className="product-profile-description">DESCRIPTION</p>
              <div className="product-profile-divider" />
              <div className="product-profile-info">
                <p className="product-profile-info__header">
                  ADDITIONAL INFORMATION
                </p>
                <p className="product-profile-info__text">
                  Color: <span>Blue, White, Black, Grey</span>
                </p>
                <p className="product-profile-info__text">
                  Size: <span>XS, S, M, L</span>
                </p>
                <p className="product-profile-info__text">
                  Material: <span>100% Polyester</span>
                </p>
              </div>
              <div className="product-profile-divider" />
              <div className="product-profile-reviews">
                <p className="product-profile-reviews__header">REVIEWS</p>
                <div className="product-profile-reviews__rate-wrapper">
                  <div className="product-profile-reviews__rate-stars">
                    <StarsRate rate={5} />
                    <span>2 Reviews</span>
                  </div>
                  <button
                    type="button"
                    className="product-profile-reviews__rate-button"
                  >
                    <Cloud />
                    <span>Write a review</span>
                  </button>
                </div>
                <div className="product-profile-reviews__content">
                  <div className="product-profile-review">
                    <div className="product-profile-review__header">
                      <span>Oleh Chabanov</span>
                      <StarsRate rate={5} />
                    </div>
                    <p className="product-profile-review__text">
                      On the other hand, we denounce with righteous indignation
                      and like men who are so beguiled and demoralized by the
                      charms of pleasure of the moment
                    </p>
                  </div>
                  <div className="product-profile-review">
                    <div className="product-profile-review__header">
                      <span>ShAmAn design</span>
                      <StarsRate rate={5} />
                    </div>
                    <p className="product-profile-review__text">
                      At vero eos et accusamus et iusto odio dignissimos ducimus
                      qui blanditiis praesentium voluptatum deleniti
                    </p>
                  </div>
                </div>
              </div>
              <div className="product-profile-divider" />
            </div>
          </div>
        </div>
      </section>
      <section
        className="product-profile-related-outer"
        data-test-id="related-slider"
      >
        <div className="container">
          <div className="product-profile-related-inner">
            <h2 className="product-profile-related-inner__header">
              RELATED PRODUCTS
            </h2>
            <div className="product-profile-related-inner__slider-controls">
              <button
                type="button"
                className="slider-related-button slider-related-button--prev"
              >
                <Arrow />
              </button>
              <button
                type="button"
                className="slider-related-button slider-related-button--next"
              >
                <Arrow />
              </button>
            </div>
          </div>
          <SliderRelatedProducts
            slides={data(params.category)}
            productType={params.category}
          />
        </div>
      </section>
    </>
  );
}
