import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { reduxSetCart } from "../../redux/reducers/cartSlice";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { schemaOrder } from "../../services/validationSchemas";
import { reduxGetOrderStoresInfo } from "../../redux/reducers/orderSlice";

export default function Cart({ isShowCart }) {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.products);
  const { storeCountries } = useSelector((state) => state.orderState);

  // cart items / delivery / payment
  const [step, setStep] = useState(1);

  // const stepsValues = [
  //   { name: "Item in Cart", stepValue: 1 },
  //   { name: "Delivery Info", stepValue: 2 },
  //   { name: "Payment", stepValue: 3 },
  // ];

  const formMethods = useForm({
    defaultValues: {
      deliveryMethod: "pickup from post offices",
      country: "",
      storeAddress: "",
      paymentMethod: "Visa",
    },
    mode: "onChange",
    resolver: yupResolver(schemaOrder),
  });
  const { setValue, unregister, watch } = formMethods;
  const deliveryMethod = watch("deliveryMethod");
  const paymentMethod = watch("paymentMethod");

  const onSubmit = (data) => console.log(data);

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
  }, [cartProducts]);

  // reset or unregister step2
  useEffect(() => {
    setValue("country", "");
    if (deliveryMethod === "express delivery") {
      unregister("postcode");
    }
    if (deliveryMethod === "store pickup") {
      unregister(["postcode", "city", "house", "apartment"]);
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
          {cartProducts.length > 0 ? (
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
          ) : (
            <>
              <p className="cart-empty-text">Sorry, your cart is empty</p>
              <button type="button" className="cart-btn-back close-cart">
                BACK TO SHOPPING
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
