import { ReactComponent as Truck } from "../../images/truck.svg";
import { ReactComponent as Returns } from "../../images/return.svg";
import { ReactComponent as Support } from "./icons/support.svg";

export default function PromoDelivery(props) {
  return (
    <section className="promo-delivery-outer">
      <div className="container">
        <div className="promo-delivery-inner">
          <div className="promo-delivery-column">
            <Truck />
            <div className="promo-delivery-column__content">
              <p className="promo-delivery-column__content-header">
                FREE SHIPPING
              </p>
              <p className="promo-delivery-column__content-text">
                On all UA order or order above $100
              </p>
            </div>
          </div>
          <div className="promo-delivery-column">
            <Returns />
            <div className="promo-delivery-column__content">
              <p className="promo-delivery-column__content-header">
                30 DAYS RETURN
              </p>
              <p className="promo-delivery-column__content-text">
                Simply return it within 30 days for an exchange
              </p>
            </div>
          </div>
          <div className="promo-delivery-column">
            <Support />
            <div className="promo-delivery-column__content">
              <p className="promo-delivery-column__content-header">
                SUPPORT 24/7
              </p>
              <p className="promo-delivery-column__content-text">
                Contact us 24 hours a day, 7 days a week
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
