import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import { reduxSetCart } from "../../redux/reducers/cartSlice";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import { schemaOrder } from "../../services/validationSchemas";
import { reduxGetOrderCountries } from "../../redux/reducers/orderSlice";
import UserService from "../../services/userService";

export default function Cart({ isShowCart, setIsShowCart }) {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.products);
  const { cartSum } = useSelector((state) => state.cart);
  const { storeCountries } = useSelector((state) => state.orderState);
  const insideAreaRef = useRef(null);

  // cart items / delivery / payment / result
  const [step, setStep] = useState(1);
  const [orderErrorMessage, setOrderErrorMessage] = useState("");
  const [isOrderError, setIsOrderError] = useState(false);

  const formMethods = useForm({
    defaultValues: {
      deliveryMethod: "pickup from post offices",
      country: "",
      storeAddress: "",
      paymentMethod: "visa",
      phone: "",
      totalPrice: "",
      isConfirmed: false,
      postcode: "",
      cardDate: "",
      card: "",
      cardCVV: "",
    },
    // if onChange: error fire from 1st touch, but can be cleared in focus if valid
    // if onBlur: error fire on blur, but can`t be cleared in focus if valid
    // if all: only masked fields wont work properly (fires error from 1st)
    // if combine with hardcode manual onChange : will be large and ugly.
    mode: "onBlur",
    // reValidateMode: "onChange",
    resolver: yupResolver(schemaOrder),
  });
  const { setValue, unregister, watch, reset, getValues } = formMethods;
  const deliveryMethod = watch("deliveryMethod");
  const paymentMethod = watch("paymentMethod");

  async function onSubmit(data) {
    setIsOrderError(false);
    setOrderErrorMessage("");
    console.log(data)
    try {
      const res = await UserService.sendOrder(data);
      setStep(4);
      localStorage.setItem("cart", JSON.stringify([]));
      dispatch(reduxSetCart([]));
      // reset();
    } catch (err) {
      setIsOrderError(true);
      setOrderErrorMessage(err?.message);
      setStep(4);
    }
  }

  function closeCart() {
    reset();
    setIsShowCart(false);
    setStep(1);
  }

  // init cart in redux from local or create new, redux-persist?
  // need a POST for update selected products info
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart !== null) {
      dispatch(reduxSetCart(cart));
    } else localStorage.setItem("cart", JSON.stringify([]));
  }, []);

  // set cart to form
  useEffect(() => {
    setValue("products", cartProducts);
    setValue("totalPrice", cartSum?.totalPrice);
  }, [cartProducts, isShowCart]);

  // close cart and reset
  useEffect(() => {
    function onClickOver(e) {
      if (isShowCart && !insideAreaRef.current?.contains(e.target)) {
        closeCart();
      }
    }
    document.addEventListener("click", onClickOver, { capture: true });
    return () => {
      document.removeEventListener("click", onClickOver);
    };
  }, [isShowCart]);

  // reset or unregister step2
  useEffect(() => {
    setValue("country", "");
    switch (deliveryMethod) {
      case "pickup from post offices":
        unregister("storeAddress");
        break;
      case "express delivery":
        unregister(["postcode", "storeAddress"]);
        break;
      case "store pickup":
        unregister(["postcode", "city", "house", "apartment", "street"]);
        if (storeCountries.length === 0) {
          dispatch(reduxGetOrderCountries());
        }
        break;
      default:
        break;
    }
  }, [deliveryMethod]);

  // reset or unregister step3
  useEffect(() => {
    setValue("card", "");
    setValue("cardDate", "");
    setValue("cardCVV", "");
    switch (paymentMethod) {
      case "paypal":
        unregister(["card", "cardDate", "cardCVV"]);
        break;
      case "visa":
      case "masterCard":
        unregister(["cashEmail"]);
        break;
      case "cash":
        unregister(["card", "cardDate", "cardCVV", "cashEmail"]);
        break;
      default:
        break;
    }
  }, [paymentMethod]);

  function renderSteps() {
    switch (step) {
      case 1:
        return <Step1 setStep={setStep} />;
      case 2:
        return <Step2 setStep={setStep} />;
      case 3:
        return <Step3 setStep={setStep} />;
      default:
        return "";
    }
  }

  return (
    <div
      className={classNames("cart-outer", { "cart--active": isShowCart })}
      data-test-id="cart"
    >
      <div className="cart-inner" ref={insideAreaRef}>
        <div className="cart-inner__header">
          <span>Shopping Cart</span>
          <button
            type="button"
            className="cart-btn-close"
            onClick={() => closeCart()}
          >
            {" "}
          </button>
        </div>
        <div className="cart-inner__content">
          {cartProducts.length > 0 && step !== 4 && (
            <>
              <div className="cart-steps">
                <p
                  className={`cart-steps__item ${
                    step === 1 && "cart-steps__item--active"
                  }`}
                >
                  Item in Cart
                </p>
                <span>/</span>
                <p
                  className={`cart-steps__item ${
                    step === 2 && "cart-steps__item--active"
                  }`}
                >
                  Delivery Info
                </p>
                <span>/</span>
                <p
                  className={`cart-steps__item ${
                    step === 3 && "cart-steps__item--active"
                  }`}
                >
                  Payment
                </p>
              </div>
              <FormProvider {...formMethods}>
                <form
                  className="cart-form-wrapper"
                  onSubmit={formMethods.handleSubmit(onSubmit)}
                >
                  {renderSteps()}
                </form>
              </FormProvider>
            </>
          )}
          {cartProducts.length === 0 && step !== 4 && (
            <>
              <p className="cart-result-title">Sorry, your cart is empty</p>
              <button
                type="button"
                className="cart-btn-back"
                onClick={() => closeCart()}
              >
                BACK TO SHOPPING
              </button>
            </>
          )}
          {step === 4 && (
            <Step4
              setStep={setStep}
              isOrderError={isOrderError}
              orderErrorMessage={orderErrorMessage}
              setIsShowCart={setIsShowCart}
              closeCart={closeCart}
              reset={reset}
            />
          )}
        </div>
      </div>
    </div>
  );
}
