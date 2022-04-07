import { useFormContext, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import ReactSelect from "react-select";
import { reduxGetOrderStoresInfo } from "../../redux/reducers/orderSlice";

// DELIVERY INFO STEP
export default function Step2({ setStep }) {
  let delaySearch;
  const dispatch = useDispatch();
  const { cartSum } = useSelector((state) => state.cart);
  const { storeCountries, storeCities, isLoading } = useSelector(
    (state) => state.orderState
  );
  const {
    register,
    trigger,
    watch,
    unregister,
    formState: { errors },
    getValues,
    control,
    reset,
    setValue,
  } = useFormContext();
  const deliveryMethod = watch("deliveryMethod");
  const country = watch("country");
  const storeAddress = watch("storeAddress");

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
        <input
          type="tel"
          placeholder="+375 (__) _______"
          className="order-info-input"
          {...register("phone")}
        />
        <p className="order-info-title">E-MAIL</p>
        <input
          type="email"
          placeholder="e-mail"
          className="order-info-input"
          {...register("email")}
        />

        {(deliveryMethod === "pickup from post offices" ||
          deliveryMethod === "express delivery") && (
          <>
            <p className="order-info-title">ADDRESS</p>
            <input
              type="text"
              className="order-info-input"
              placeholder="Country"
              {...register("country")}
            />
            <input
              type="text"
              className="order-info-input"
              placeholder="City"
              {...register("city")}
            />
            <input
              type="text"
              className="order-info-input"
              placeholder="Street"
              {...register("street")}
            />
            <div className="order-info-group-input">
              <input
                type="text"
                className="order-info-input"
                placeholder="House"
                {...register("house")}
              />
              <input
                type="text"
                className="order-info-input"
                placeholder="Apartment"
                {...register("apartment")}
              />
            </div>
            {deliveryMethod === "pickup from post offices" && (
              <>
                <p className="order-info-title">POSTCODE</p>
                <input
                  type="text"
                  className="order-info-input"
                  placeholder="BY ______"
                  {...register("postcode")}
                />
              </>
            )}
          </>
        )}

        {deliveryMethod === "store pickup" && (
          <>
            <p className="order-info-title">ADDRESS OF STORE</p>
            <Controller
              name="country"
              control={control}
              render={({ field: { onBlur } }) => (
                <ReactSelect
                  isClearable
                  // save value between steps
                  defaultValue={
                    country !== "" ? { value: country, label: country } : null
                  }
                  // set only value to form
                  onChange={(item) => {
                    if (item?.value) {
                      setValue("country", item?.value);
                    } else setValue("country", "");
                  }}
                  onBlur={() => {
                    console.log("blur");
                  }}
                  className="custom-select-container"
                  classNamePrefix="custom-select"
                  // menuShouldScrollIntoView
                  noOptionsMessage={() => "Country not found"}
                  placeholder="Country"
                  maxMenuHeight={130}
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary25: "#f8f8f8",
                      primary: "#f8f8f8",
                    },
                  })}
                  options={storeCountries}
                  isLoading={isLoading==="countries"}
                />
              )}
            />

            <Controller
              name="storeAddress"
              control={control}
              render={({ field: { onBlur } }) => (
                <ReactSelect
                  isClearable
                  defaultValue={
                    storeAddress !== ""
                      ? { value: storeAddress, label: storeAddress }
                      : null
                  }
                  onChange={(item) => {
                    if (item?.value) {
                      setValue("storeAddress", item?.value);
                    } else setValue("storeAddress", "");
                  }}
                  // send req for cities with delay typing
                  onInputChange={(val) => {
                    clearTimeout(delaySearch);
                    delaySearch = setTimeout(() => {
                      if (val.length >= 3) {
                        dispatch(
                          reduxGetOrderStoresInfo({
                            type: "cities",
                            search: { city: val, country },
                          })
                        );
                      }
                    }, 1500);
                  }}
                  onBlur={() => {
                    console.log("blur");
                  }}
                  className="custom-select-container"
                  classNamePrefix="custom-select"
                  // menuShouldScrollIntoView
                  noOptionsMessage={() => "Stores not found"}
                  placeholder="Store address"
                  maxMenuHeight={130}
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary25: "#f8f8f8",
                      primary: "#f8f8f8",
                    },
                  })}
                  options={storeCities}
                  isDisabled={country === ""}
                  isLoading={isLoading==="cities"}
                />
              )}
            />
          </>
        )}

        <label className="order-info-label-ch">
          <input type="checkbox" className="checkbox-input" />
          <span> I agree to the processing of my personal information</span>
        </label>
      </div>

      <div className="cart-products-total-price">
        <span>Total</span>${cartSum.totalPrice.toFixed(2)}
      </div>

      <button
        type="button"
        className="cart-form-submit-btn"
        onClick={() => {
          setStep(3);
        }}
      >
        FURTHER
      </button>
      <button
        type="button"
        className="cart-form-view-cart-btn"
        onClick={() => {
          console.log(getValues());
        }}
      >
        VIEW CART
      </button>
    </>
  );
}
