import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as Trash } from "../../images/trash.svg";
import UserService from "../../services/userService";
import { reduxSetCart } from "../../redux/reducers/cartSlice";

export default function Step1({ register, errors }) {
  const cartProducts = useSelector((state) => state.cart.products);
  const { cartSum } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <>
      <ul className="cart-products-list">
        {cartProducts.map((item) => (
          <li
            key={item.myId}
            className="cart-products-list__item"
            data-test-id="cart-card"
          >
            <div className="cart-products-list__item-img">
              <img
                src={`https://training.cleverland.by/shop/${item.image}`}
                alt=""
              />
            </div>
            <div className="cart-products-list__item-content">
              <p className="cart-product-name">{item.name}</p>
              <p className="cart-product-params">
                {item.color},{item.size}
              </p>
              <div className="cart-product-controls">
                <div className="cart-product-controls__counter">
                  <button
                    type="button"
                    className="cart-product-controls__counter-button cart-product-controls__counter-button--minus"
                    data-test-id="minus-product"
                    onClick={() => {
                      UserService.cartProductMinus(item);
                      dispatch(
                        reduxSetCart(JSON.parse(localStorage.getItem("cart")))
                      );
                    }}
                  >
                    {" "}
                  </button>
                  <span className="cart-product-controls__counter-value">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    data-test-id="plus-product"
                    className="cart-product-controls__counter-button cart-product-controls__counter-button--plus"
                    onClick={() => {
                      UserService.cartProductPlus(item);
                      dispatch(
                        reduxSetCart(JSON.parse(localStorage.getItem("cart")))
                      );
                    }}
                  >
                    {" "}
                  </button>
                </div>
                <div className="cart-product-controls__price">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <button
                  data-test-id="remove-product"
                  type="button"
                  onClick={() => {
                    UserService.removeFromCart(item);
                    dispatch(
                      reduxSetCart(JSON.parse(localStorage.getItem("cart")))
                    );
                  }}
                >
                  <Trash />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-products-total-price">
        <span>Total</span>${cartSum.totalPrice.toFixed(2)}
      </div>
    </>
  );
}
