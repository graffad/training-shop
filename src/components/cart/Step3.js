import { useFormContext, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { useState } from "react";
import visaPng from "../../images/credit-cards/visa_x42.png";
import paypalPng from "../../images/credit-cards/paypal_2_x42.png";
import mcPng from "../../images/credit-cards/mastercard_x42.png";
import eye from "../../images/eyeOpen.png";
import eyeClose from "../../images/eyeClose.png";

// PAYMENT STEP
export default function Step3({ setStep }) {
  const {
    register,
    formState: { errors },
    trigger,
    getValues,
    control,
    reset,
    watch,
  } = useFormContext();
  const { cartSum } = useSelector((state) => state.cart);
  const paymentMethod = watch("paymentMethod");

  const [visible, setVisible] = useState(false);

  return (
    <>
      <div className="order-info-wrapper">
        <div className="order-info-list">
          <p className="order-info-list__text">Method of payments</p>
          <label className="order-info-list__item">
            <input
              type="radio"
              className="radio-input"
              value="PayPal"
              {...register("paymentMethod")}
            />
            <img src={paypalPng} alt="paypal" />
          </label>
          <label className="order-info-list__item">
            <input
              type="radio"
              className="radio-input"
              value="Visa"
              {...register("paymentMethod")}
            />
            <img src={visaPng} alt="visa" />
          </label>
          <label className="order-info-list__item">
            <input
              type="radio"
              value="MasterCard"
              className="radio-input"
              {...register("paymentMethod")}
            />
            <img src={mcPng} alt="master-card" />
          </label>
          <label className="order-info-list__item">
            <input
              type="radio"
              value="Cash"
              className="radio-input"
              {...register("paymentMethod")}
            />
            Cash
          </label>
        </div>

        {(paymentMethod === "Visa" || paymentMethod === "MasterCard") && (
          <>
            <p className="order-info-title">CARD</p>
            <input
              type="text"
              placeholder="_________"
              className="order-info-input"
              {...register("card")}
            />
            <div className="order-info-group-input">
              <input
                type="text"
                className="order-info-input"
                placeholder="MM/YY"
                {...register("cardDate")}
              />
              <div className="order-info-group-input__password">
                <input
                  type={visible ? "text" : "password"}
                  className="order-info-input"
                  placeholder="CVV"
                  {...register("cardCVV")}
                />
                <button
                  type="button"
                  className="password-eye"
                  onClick={() => setVisible((prev) => !prev)}
                >
                  <img src={visible ? eye : eyeClose} alt="eye" />
                </button>
              </div>
            </div>
          </>
        )}

        {paymentMethod === "PayPal" && (
          <>
            <p className="order-info-title">E-MAIL</p>
            <input
              type="email"
              placeholder="e-mail"
              className="order-info-input"
              {...register("cashEmail")}
            />
          </>
        )}
      </div>


      <div className="cart-products-total-price">
        <span>Total</span>${cartSum.totalPrice.toFixed(2)}
      </div>

      <button
        type="button"
        className="cart-form-submit-btn"
        onClick={() => {
          console.log(getValues());
        }}
      >
        FURTHER
      </button>
      <button
        type="button"
        className="cart-form-view-cart-btn"
        onClick={() => {
          setStep(1);
        }}
      >
        VIEW CART
      </button>
    </>
  );
}
