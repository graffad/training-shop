export default function Step4({
  isOrderError = false,
  orderErrorMessage = "",
  setStep,
  closeCart,
  reset,
}) {
  return (
    <>
      <p className="cart-result-title">
        {isOrderError
          ? "Sorry, your payment has not been processed."
          : "Thank you for your order"}
      </p>
      {isOrderError ? (
        <>
          <p className="cart-result-text">{orderErrorMessage}</p>
          <button
            type="button"
            className="cart-btn-back"
            onClick={() => setStep(3)}
          >
            BACK TO PAYMENT
          </button>
          <button
            type="button"
            className="cart-form-view-cart-btn"
            onClick={() => {
              setStep(1);
              reset();
            }}
          >
            VIEW CART
          </button>
        </>
      ) : (
        <>
          <p className="cart-result-text">
            Information about your order will appear in your e-mail.
          </p>
          <p className="cart-result-text">Our manager will call you back.</p>
          <button
            type="button"
            className="cart-btn-back"
            onClick={() => {
              closeCart();
            }}
          >
            BACK TO SHOPPING
          </button>
        </>
      )}
    </>
  );
}
