import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { reduxSetCart } from "../../redux/reducers/cartSlice";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import { schemaOrder } from "../../services/validationSchemas";
import { reduxGetOrderStoresInfo } from "../../redux/reducers/orderSlice";
import UserService from "../../services/userService";

export default function Cart({ isShowCart, setIsShowCart }) {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.products);
  const { cartSum } = useSelector((state) => state.cart);
  const { storeCountries } = useSelector((state) => state.orderState);

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
    mode: "all",
    // reValidateMode: "onChange",
    resolver: yupResolver(schemaOrder),
  });
  const { setValue, unregister, watch, reset } = formMethods;
  const deliveryMethod = watch("deliveryMethod");
  const paymentMethod = watch("paymentMethod");

  const onSubmit = async (data) => {
    setIsOrderError(false);
    setOrderErrorMessage("");
    try {
      const res = await UserService.sendOrder(data);
      setStep(4);
      localStorage.setItem("cart", JSON.stringify([]));
      dispatch(reduxSetCart([]));
    } catch (err) {
      setIsOrderError(true);
      setOrderErrorMessage(err?.message);
      setStep(4);
    }
  };

  function closeCart(el) {
    if (
      el.classList.contains("cart--active") ||
      el.classList.contains("close-cart")
    ) {
      reset();
      setIsShowCart(false);
      setStep(1);
    }
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
    document.addEventListener("click", (event) => {
      closeCart(event.target);
    });
    return () => {
      document.removeEventListener("click", closeCart);
    };
  }, []);

  // reset or unregister step2
  useEffect(() => {
    setValue("country", "");
    if (deliveryMethod === "pickup from post offices") {
      unregister("storeAddress");
    }
    if (deliveryMethod === "express delivery") {
      unregister(["postcode", "storeAddress"]);
    }
    if (deliveryMethod === "store pickup") {
      unregister(["postcode", "city", "house", "apartment", "street"]);
      if (storeCountries.length === 0) {
        dispatch(reduxGetOrderStoresInfo({ type: "countries" }));
      }
    }
  }, [deliveryMethod]);

  // reset or unregister step3
  useEffect(() => {
    setValue("card", "");
    setValue("cardDate", "");
    setValue("cardCVV", "");
    if (paymentMethod === "paypal") {
      unregister(["card", "cardDate", "cardCVV", "cashEmail"]);
    }
    if (paymentMethod === "visa" || paymentMethod === "masterCard") {
      unregister(["cashEmail"]);
    }
    if (paymentMethod === "visa" || paymentMethod === "masterCard") {
      unregister(["card", "cardDate", "cardCVV", "cashEmail"]);
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
      className={`cart-outer ${isShowCart ? "cart--active" : ""}`}
      data-test-id="cart"
    >
      <div className="cart-inner">
        <div className="cart-inner__header">
          <span>Shopping Cart</span>
          <button type="button" className="cart-btn-close close-cart">
            {" "}
          </button>
        </div>
        <div className="cart-inner__content">
          {cartProducts.length > 0 && (
            <>
              {step !== 4 && (
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
              )}

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
              <button type="button" className="cart-btn-back close-cart">
                BACK TO SHOPPING
              </button>
            </>
          )}
          {step === 4 && (
            <Step4
              setStep={setStep}
              isOrderError={isOrderError}
              orderErrorMessage={orderErrorMessage}
            />
          )}
        </div>
      </div>
    </div>
  );
}
