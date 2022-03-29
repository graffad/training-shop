import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import StarsRate from "./StarsRate";
import Slider from "../slider/Slider";
import UserService from "../../services/userService";
import { reduxSetCart } from "../../redux/reducers/cartSlice";
import {reduxShowModalReview} from "../../redux/reducers/reviewSlice";

// icons
import { ReactComponent as Hook } from "./icons/hook.svg";
import { ReactComponent as Hart } from "./icons/hart.svg";
import { ReactComponent as Compare } from "./icons/compare.svg";
import { ReactComponent as Truck } from "../../images/truck.svg";
import { ReactComponent as Returns } from "../../images/return.svg";
import { ReactComponent as Mail } from "../../images/mail.svg";
import { ReactComponent as Cloud } from "../../images/cloud.svg";
import stripe from "../../images/credit-cards/Stripe_x42.png";
import aes from "../../images/credit-cards/AES256_x42.png";
import paypal from "../../images/credit-cards/paypal_2_x42.png";
import visa from "../../images/credit-cards/visa_x42.png";
import mastercard from "../../images/credit-cards/mastercard_x42.png";
import discover from "../../images/credit-cards/discover_x42.png";
import american from "../../images/credit-cards/american-express_x42.png";

export default function ProductProfile({ params, productData = {} }) {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.products);
  const uniqueColorObj = [
    ...new Map(productData.images?.map((img) => [img.color, img])).values(),
  ];
  // ▼ will update to react-hook-form
  const [productColor, setProductColor] = useState("");
  const [productSize, setProductSize] = useState("");
  const [imgForCart, setImgForCart] = useState("");

  function compareProdCart() {
    // for switcher add/remove cart
    return cartProducts.find(
      (item) => item.myId === `${productData.id}-${productColor}-${productSize}`
    );
  }
  useEffect(() => {
    // or check obj keys if empty
    if (productData.id !== undefined) {
      setProductColor(productData.images[0].color);
      setProductSize(productData.sizes[0]);
      setImgForCart(productData.images[0].url);
    }
  }, [productData]);

  return (
    <section className="product-profile-outer">
      <div className="container">
        {productData.id ? (
          <div className="product-profile-inner">
            <div
              className="product-profile-slider"
              data-test-id="product-slider"
            >
              <Slider
                slides={productData.images}
                showImgNav
                discount={productData.discount}
              />
            </div>
            <div className="product-profile-right">
              <div className="product-profile-colors">
                <h4 className="product-profile-colors__header">
                  COLOR: <span>{productColor}</span>
                </h4>
                <div className="product-profile-colors__images-wrapper">
                  {uniqueColorObj.map((item, index) => (
                    <div className="product-profile-colors__img" key={item.id}>
                      <input
                        type="radio"
                        id={item.id}
                        name="color"
                        value={item.color}
                        defaultChecked={index === 0}
                        onChange={(event) => {
                          setProductColor(event.target.value);
                          setImgForCart(item.url);
                        }}
                      />
                      <label htmlFor={item.id}>
                        <img
                          src={`https://training.cleverland.by/shop/${item.url}`}
                          alt=""
                        />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="product-profile-sizes">
                <h4 className="product-profile-sizes__header">
                  SIZE: <span>{productSize}</span>
                </h4>
                <div className="product-profile-sizes__variants-wrapper">
                  {productData.sizes.map((item, index) => (
                    <div className="product-profile-sizes__variant" key={item}>
                      <input
                        type="radio"
                        id={item}
                        name="size"
                        value={item}
                        defaultChecked={index === 0}
                        onChange={(event) => setProductSize(event.target.value)}
                      />
                      <label htmlFor={item}>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="product-profile-sizes__guide">
                  <Hook />
                  <span>Size guide</span>
                </div>
              </div>
              <div className="product-profile-divider" />
              <div className="product-profile-controls">
                <div className="product-profile-controls__item product-profile-controls__price">
                  $ {productData.price.toFixed(2)}
                </div>

                {compareProdCart() ? (
                  <button
                    type="button"
                    className="product-profile-controls__item product-profile-controls__cart"
                    data-test-id="add-cart-button"
                    onClick={() => {
                      UserService.removeFromCart(compareProdCart());
                      dispatch(
                        reduxSetCart(JSON.parse(localStorage.getItem("cart")))
                      );
                    }}
                  >
                    REMOVE FROM CART
                  </button>
                ) : (
                  <button
                    type="button"
                    className="product-profile-controls__item product-profile-controls__cart"
                    data-test-id="add-cart-button"
                    onClick={() => {
                      UserService.addToCart({
                        ...productData,
                        color: productColor,
                        size: productSize,
                        image: imgForCart,
                        myId: `${productData.id}-${productColor}-${productSize}`,
                      });
                      dispatch(
                        reduxSetCart(JSON.parse(localStorage.getItem("cart")))
                      );
                    }}
                  >
                    ADD TO CART
                  </button>
                )}

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
                  Color:{" "}
                  <span>
                    {[...new Set(productData.images.map((n) => n.color))].join(
                      ", "
                    )}
                  </span>
                </p>
                <p className="product-profile-info__text">
                  Size:{" "}
                  <span>
                    {[...new Set(productData.sizes.map((n) => n))].join(", ")}
                  </span>
                </p>
                <p className="product-profile-info__text">
                  Material: <span>{productData.material}</span>
                </p>
              </div>
              <div className="product-profile-divider" />
              <div className="product-profile-reviews">
                <p className="product-profile-reviews__header">REVIEWS</p>
                <div className="product-profile-reviews__rate-wrapper">
                  <div className="product-profile-reviews__rate-stars">
                    <StarsRate rate={productData.rating} />
                    <span>{productData.reviews.length} Reviews</span>
                  </div>
                  <button
                    type="button"
                    className="product-profile-reviews__rate-button"
                    onClick={()=>dispatch(reduxShowModalReview())}
                    data-test-id="review-button"
                  >
                    <Cloud />
                    <span>Write a review</span>
                  </button>
                </div>
                <div className="product-profile-reviews__content">
                  {productData.reviews.map((item) => (
                    <div className="product-profile-review" key={item.id}>
                      <div className="product-profile-review__header">
                        <span>{item.name}</span>
                        <StarsRate rate={item.rating} />
                      </div>
                      <p className="product-profile-review__text">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="product-profile-divider" />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </section>
  );
}
