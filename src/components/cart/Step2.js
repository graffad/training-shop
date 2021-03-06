import { useFormContext, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import InputMask from "react-input-mask";
import { useEffect } from "react";
import classNames from "classnames";
import { MaskPhone } from "../../services/masksWithConditions";
import { schemaStep2 } from "../../services/validationSchemas";
import { CustomSelectCountries, CustomSelectCities } from "./CustomInputs";
import { cartConstTypes } from "../constants/constants";

// DELIVERY INFO STEP
export default function Step2({ setStep }) {
  const { cartSum } = useSelector((state) => state.cart);
  const { storeCountries, storeCities, isLoading, errorType } = useSelector(
    (state) => state.orderState
  );
  const { POST_OFFICES, EXPRESS_DELIVERY, STORE_PICKUP, COUNTRIES, CITIES } =
    cartConstTypes;
  const {
    register,
    trigger,
    watch,
    formState: { errors },
    getValues,
    control,
    setValue,
    setError,
  } = useFormContext();
  const deliveryMethod = watch("deliveryMethod");
  const country = watch("country");
  const storeAddress = watch("storeAddress");
  // set custom error to form if request countries || cities is failed
  useEffect(() => {
    if (errorType === COUNTRIES) {
      setError("country", { message: "ошибка загрузки" });
    }
    if (errorType === CITIES) {
      setError("storeAddress", { message: "ошибка загрузки" });
    }
  }, [errorType]);

  function passNext() {
    schemaStep2
      .validate(getValues())
      .then(() => {
        setStep(3);
      })
      .catch((err) => {
        // trigger manually to avoid trigger in next step
        trigger([
          "phone",
          "country",
          "city",
          "street",
          "house",
          "postcode",
          "storeAddress",
          "email",
          "isConfirmed",
        ]);
        // uncheck if invalid
        setValue("isConfirmed", false);
      });
  }

  return (
    <>
      <div className="order-info-wrapper">
        <div className="order-info-list">
          <p className="order-info-list__text">
            Choose the method of delivery of the items
          </p>
          <label className="order-info-list__item">
            <input
              type="radio"
              className="radio-input"
              value="pickup from post offices"
              {...register("deliveryMethod")}
            />
            Pickup from post offices
          </label>
          <label className="order-info-list__item">
            <input
              type="radio"
              className="radio-input"
              value="express delivery"
              {...register("deliveryMethod")}
            />
            Express delivery
          </label>
          <label className="order-info-list__item">
            <input
              type="radio"
              className="radio-input"
              value="store pickup"
              {...register("deliveryMethod")}
            />
            Store pickup
          </label>
        </div>
        <p className="order-info-title">PHONE</p>

        <div
          className={classNames("order-info-input-wrapper", {
            "order-info-input-wrapper--error": errors?.phone,
          })}
        >
          <Controller
            name="phone"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <MaskPhone inpValue={value} onChange={onChange} onBlur={onBlur} />
            )}
          />
          {errors?.phone && (
            <p className="order-info-input-error-text">
              {errors.phone.message}
            </p>
          )}
        </div>

        <p className="order-info-title">E-MAIL</p>
        <div
          className={classNames("order-info-input-wrapper", {
            "order-info-input-wrapper--error": errors?.email,
          })}
        >
          <input
            type="email"
            placeholder="e-mail"
            className="order-info-input"
            {...register("email")}
          />
          {errors?.email && (
            <p className="order-info-input-error-text">
              {errors.email.message}
            </p>
          )}
        </div>
        {(deliveryMethod === POST_OFFICES ||
          deliveryMethod === EXPRESS_DELIVERY) && (
          <>
            <p className="order-info-title">ADDRESS</p>
            <div
              className={classNames("order-info-input-wrapper", {
                "order-info-input-wrapper--error": errors?.country,
              })}
            >
              <input
                type="text"
                className="order-info-input"
                placeholder="Country"
                {...register("country")}
              />
              {errors?.country && (
                <p className="order-info-input-error-text">
                  {errors.country.message}
                </p>
              )}
            </div>

            <div
              className={classNames("order-info-input-wrapper", {
                "order-info-input-wrapper--error": errors?.city,
              })}
            >
              <input
                type="text"
                className="order-info-input"
                placeholder="City"
                {...register("city")}
              />
              {errors?.city && (
                <p className="order-info-input-error-text">
                  {errors.city.message}
                </p>
              )}
            </div>

            <div
              className={classNames("order-info-input-wrapper", {
                "order-info-input-wrapper--error": errors?.street,
              })}
            >
              <input
                type="text"
                className="order-info-input"
                placeholder="Street"
                {...register("street")}
              />
              {errors?.street && (
                <p className="order-info-input-error-text">
                  {errors.street.message}
                </p>
              )}
            </div>
            <div className="order-info-group-input">
              <div
                className={classNames("order-info-input-wrapper", {
                  "order-info-input-wrapper--error": errors?.house,
                })}
              >
                <input
                  type="text"
                  className="order-info-input"
                  placeholder="House"
                  {...register("house")}
                />
                {errors?.house && (
                  <p className="order-info-input-error-text">
                    {errors.house.message}
                  </p>
                )}
              </div>
              <div className="order-info-input-wrapper">
                <input
                  type="text"
                  className="order-info-input"
                  placeholder="Apartment"
                  {...register("apartment")}
                />
              </div>
            </div>
            {deliveryMethod === POST_OFFICES && (
              <>
                <p className="order-info-title">POSTCODE</p>
                <div
                  className={classNames("order-info-input-wrapper", {
                    "order-info-input-wrapper--error": errors?.postcode,
                  })}
                >
                  <Controller
                    name="postcode"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <InputMask
                        name="postcode"
                        onChange={onChange}
                        mask="BY 999999"
                        className="order-info-input"
                        placeholder="BY ______"
                        value={value}
                        onBlur={onBlur}
                      />
                    )}
                  />
                  {errors?.postcode && (
                    <p className="order-info-input-error-text">
                      {errors.postcode.message}
                    </p>
                  )}
                </div>
              </>
            )}
          </>
        )}

        {deliveryMethod === STORE_PICKUP && (
          <>
            <p className="order-info-title">ADDRESS OF STORE</p>
            <div
              className={classNames("order-info-input-wrapper", {
                "order-info-input-wrapper--error": errors?.country,
              })}
            >
              <Controller
                name="country"
                control={control}
                render={({ field: { onBlur } }) => (
                  <CustomSelectCountries
                    array={storeCountries}
                    currentValue={country}
                    setValue={setValue}
                    onBlur={onBlur}
                    trigger={trigger}
                    isLoading={isLoading === COUNTRIES}
                  />
                )}
              />
              {errors?.country && (
                <p className="order-info-input-error-text">
                  {errors.country.message}
                </p>
              )}
            </div>

            <div
              className={classNames("order-info-input-wrapper", {
                "order-info-input-wrapper--error": errors?.storeAddress,
              })}
            >
              <Controller
                name="storeAddress"
                control={control}
                render={({ field: { onBlur } }) => (
                  <CustomSelectCities
                    array={storeCities}
                    currentValue={storeAddress}
                    setValue={setValue}
                    onBlur={onBlur}
                    trigger={trigger}
                    country={country}
                    setError={setError}
                    disabled={country === ""}
                    isLoading={isLoading === CITIES}
                  />
                )}
              />

              {errors?.storeAddress && (
                <p className="order-info-input-error-text">
                  {errors.storeAddress.message}
                </p>
              )}
            </div>
          </>
        )}

        <label className="order-info-label-ch">
          <input
            type="checkbox"
            className={classNames("checkbox-input", {
              "checkbox-input--error": errors?.isConfirmed,
            })}
            {...register("isConfirmed")}
          />
          <span> I agree to the processing of my personal information</span>
        </label>
        {errors?.isConfirmed && (
          <p className="order-info-checkbox-error">
            {errors.isConfirmed.message}
          </p>
        )}
      </div>

      <div className="cart-products-total-price">
        <span>Total</span>${cartSum.totalPrice.toFixed(2)}
      </div>

      <button
        type="button"
        className="cart-form-submit-btn"
        onClick={() => passNext()}
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
