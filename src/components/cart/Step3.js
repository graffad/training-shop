import { useFormContext, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { useState } from "react";
import InputMask from "react-input-mask";
import classNames from "classnames";
import { MaskCardDate } from "../../services/masksWithConditions";
import {cartConstTypes} from "../constants/constants";
// icons
import visaPng from "../../images/credit-cards/visa_x42.png";
import paypalPng from "../../images/credit-cards/paypal_2_x42.png";
import mcPng from "../../images/credit-cards/mastercard_x42.png";
import eye from "../../images/eyeOpen.png";
import eyeClose from "../../images/eyeClose.png";

// PAYMENT STEP
export default function Step3({ setStep }) {
    const {VISA,MASTER_CARD,CASH,PAYPAL} = cartConstTypes
  const {
    register,
    formState: { errors, isSubmitting },
    control,
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
              value="paypal"
              {...register("paymentMethod")}
            />
            <img src={paypalPng} alt="paypal" />
          </label>
          <label className="order-info-list__item">
            <input
              type="radio"
              className="radio-input"
              value="visa"
              {...register("paymentMethod")}
            />
            <img src={visaPng} alt="visa" />
          </label>
          <label className="order-info-list__item">
            <input
              type="radio"
              value="masterCard"
              className="radio-input"
              {...register("paymentMethod")}
            />
            <img src={mcPng} alt="master-card" />
          </label>
          <label className="order-info-list__item">
            <input
              type="radio"
              value="cash"
              className="radio-input"
              {...register("paymentMethod")}
            />
            Cash
          </label>
        </div>

        {(paymentMethod === VISA || paymentMethod === MASTER_CARD) && (
          <>
            <p className="order-info-title">CARD</p>
            <div
              className={classNames("order-info-input-wrapper", {
                "order-info-input-wrapper--error": errors?.card,
              })}
            >
              <Controller
                name="card"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputMask
                    name="card"
                    onChange={onChange}
                    onBlur={onBlur}
                    mask="9999 9999 9999 9999"
                    className="order-info-input"
                    alwaysShowMask
                    value={value}
                  />
                )}
              />
              {errors?.card && (
                <p className="order-info-input-error-text">
                  {errors.card.message}
                </p>
              )}
            </div>
            <div className="order-info-group-input">
              <div
                className={classNames("order-info-input-wrapper", {
                  "order-info-input-wrapper--error": errors?.cardDate,
                })}
              >
                <Controller
                  name="cardDate"
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <MaskCardDate
                      inpValue={value}
                      onChange={onChange}
                      onBlur={onBlur}
                    />
                  )}
                />
                {errors?.cardDate && (
                  <p className="order-info-input-error-text">
                    {errors.cardDate.message}
                  </p>
                )}
              </div>
              <div
                className={classNames("order-info-input-wrapper", {
                  "order-info-input-wrapper--error": errors?.cardCVV,
                })}
              >
                <div className="order-info-group-input__password">
                  <Controller
                    name="cardCVV"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <InputMask
                        name="cardCVV"
                        type={visible ? "text" : "password"}
                        onChange={onChange}
                        onBlur={onBlur}
                        mask="9999"
                        className="order-info-input"
                        value={value}
                        maskChar={null}
                        placeholder="CVV"
                      />
                    )}
                  />

                  <button
                    type="button"
                    className="password-eye"
                    onClick={() => setVisible((prev) => !prev)}
                  >
                    <img src={visible ? eye : eyeClose} alt="eye" />
                  </button>
                </div>
                {errors?.cardCVV && (
                  <p className="order-info-input-error-text">
                    {errors.cardCVV.message}
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        {paymentMethod === PAYPAL && (
          <>
            <p className="order-info-title">E-MAIL</p>
            <div
              className={classNames("order-info-input-wrapper", {
                "order-info-input-wrapper--error": errors?.cashEmail,
              })}
            >
              <input
                type="email"
                placeholder="e-mail"
                className="order-info-input"
                {...register("cashEmail")}
              />
              {errors?.cashEmail && (
                <p className="order-info-input-error-text">
                  {errors.cashEmail.message}
                </p>
              )}
            </div>
          </>
        )}
      </div>

      <div className="cart-products-total-price">
        <span>Total</span>${cartSum.totalPrice.toFixed(2)}
      </div>

      <button
        type="submit"
        className="cart-form-submit-btn"
        disabled={isSubmitting}
      >
        {paymentMethod === CASH ? "READY" : "CHECK OUT"}
        {isSubmitting && <span className="loader-small" />}
      </button>
      <button
        type="button"
        className="cart-form-view-cart-btn"
        onClick={() => {
          setStep(2);
        }}
      >
        VIEW CART
      </button>
    </>
  );
}
