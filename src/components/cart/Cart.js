import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { reduxSetCart } from "../../redux/reducers/cartSlice";
import Step1 from "./Step1";
import Step2 from "./Step2";

export default function Cart({ isShowCart }) {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.products);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  const [step, setStep] = useState(1);
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart !== null) {
      dispatch(reduxSetCart(cart));
    } else localStorage.setItem("cart", JSON.stringify([]));
  }, []);

  function renderSteps() {
    switch (step) {
      case 1:
        return <Step1 register={register} errors={errors} />;
      case 2:
        return <Step2 register={register} errors={errors} />;
      default:
        return <Step1 register={register} errors={errors} />;
    }
  }

  return (
    <div className={`cart-outer ${isShowCart ? "cart--active" : ""}`} data-test-id="cart">
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
                <button
                  type="button"
                  className="cart-steps__item"
                  onClick={() => setStep(1)}
                >
                  Item in Cart
                </button>
                <span>/</span>
                <button
                  type="button"
                  className="cart-steps__item"
                  onClick={() => setStep(2)}
                >
                  Delivery Info
                </button>
                <span>/</span>
                <button
                  type="button"
                  className="cart-steps__item"
                  onClick={() => setStep(3)}
                >
                  Payment
                </button>
              </div>
              <form
                className="cart-form-wrapper"
                onSubmit={handleSubmit(onSubmit)}
              >
                {renderSteps()}
                <button type="submit" className="cart-form-submit-btn">
                  FURTHER
                </button>
                <button type="button" className="cart-form-view-cart-btn close-cart">
                  VIEW CART
                </button>
              </form>
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
