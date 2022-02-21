import { Link } from "react-router-dom";
import Slider from "../slider/Slider";
import { sliderPromo } from "../constants/constants";

export default function MainPromo() {
  return (
    <section className="main-promo-outer">
      <div className="container">
        <div className="main-promo-inner">
          <div
            className="main-promo-inner--left main-promo-inner__slider"
            data-test-id="main-slider"
          >
            <Slider slides={sliderPromo} />
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
