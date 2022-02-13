import { Link } from "react-router-dom";
import { ReactComponent as Arrow } from "../../images/arr-left.svg";

export default function MainPromo() {
  return (
    <section className="main-promo-outer">
      <div className="container">
        <div className="main-promo-inner">
          <div className="main-promo-inner--left main-promo-inner__slider slider">
            <button type="button" className="slider-button slider-button--left">
              <Arrow />
            </button>
            <div className="slider-banner">
              <p className="slider-banner__header">BANNER</p>
              <p className="slider-banner__text">your Title text </p>
            </div>
            <button
              type="button"
              className="slider-button slider-button--right"
            >
              <Arrow />
            </button>
          </div>
          <div className="main-promo-inner--right">
            <Link to="/women" className="main-promo-inner__category">
              <p>WOMEN</p>
            </Link>
            <Link to="/men" className="main-promo-inner__category">
              <p>MEN</p>
            </Link>
            <Link to="/accessories" className="main-promo-inner__category">
              <p>ACCESSORIES</p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
