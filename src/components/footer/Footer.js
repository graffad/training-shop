import { Link } from "react-router-dom";
import { ReactComponent as Phone } from "./icons/phone.svg";
import { ReactComponent as Map } from "./icons/map.svg";
import { ReactComponent as Time } from "./icons/time.svg";
import { ReactComponent as Mail } from "../../images/mail.svg";
import { ReactComponent as Facebook } from "../../images/facebook.svg";
import { ReactComponent as Instagram } from "../../images/instagram.svg";
import { ReactComponent as Twitter } from "../../images/twitter.svg";
import { ReactComponent as Pinterest } from "../../images/pinterest.svg";
import stripe from "../../images/credit-cards/Stripe_x42.png";
import aes from "../../images/credit-cards/AES256_x42.png";
import paypal from "../../images/credit-cards/paypal_2_x42.png";
import visa from "../../images/credit-cards/visa_x42.png";
import mastercard from "../../images/credit-cards/mastercard_x42.png";
import discover from "../../images/credit-cards/discover_x42.png";
import american from "../../images/credit-cards/american-express_x42.png";
import {
  footerNavUseful,
  footerNavInfo,
  footerNavCategories,
} from "../constants/constants";

export default function Footer(props) {
  return (
    <footer className="footer" data-test-id="footer">
      <section className="footer-intouch-outer">
        <div className="container">
          <div className="footer-intouch-inner">
            <p className="footer-intouch-text">BE IN TOUCH WITH US:</p>
            <form action="#" className="footer-intouch-form">
              <input
                type="text"
                className="footer-intouch-form__input"
                placeholder="Enter your email"
              />
              <button type="submit" className="footer-intouch-form__button">
                JOIN US
              </button>
            </form>
            <div className="footer-intouch-social social-icons">
              <Facebook className="social-icons__item" />
              <Twitter className="social-icons__item" />
              <Instagram className="social-icons__item" />
              <Pinterest className="social-icons__item" />
            </div>
          </div>
        </div>
      </section>
      <div className="container">
        <section className="footer-content">
          <div className="footer-content-column">
            <h4 className="footer-content-column__title">CATEGORIES</h4>
            {footerNavCategories.map((item) => (
              <Link
                key={item.id}
                to={`/${item.path}`}
                data-test-id={`footer-nav-link-${item.path}`}
                className="footer-content-column__link"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="footer-content-column">
            <h4 className="footer-content-column__title">INFORMATION</h4>
            {footerNavInfo.map((item) => (
              <Link
                key={item.id}
                to={`/${item.path}`}
                data-test-id={`footer-nav-link-${item.path}`}
                className="footer-content-column__link"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="footer-content-column">
            <h4 className="footer-content-column__title">USEFUL LINKS</h4>
            {footerNavUseful.map((item) => (
              <Link
                key={item.id}
                to={`/${item.path}`}
                data-test-id={`footer-nav-link-${item.path}`}
                className="footer-content-column__link"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="footer-content-column">
            <h4 className="footer-content-column__title">CONTACT US</h4>
            <Link to="/" className="footer-content-column__link">
              <Map />
              Belarus, Gomel, Lange 17
            </Link>
            <Link to="/" className="footer-content-column__link">
              <Phone />
              +375 29 100 20 30
            </Link>
            <Link to="/" className="footer-content-column__link">
              <Time />
              All week 24/7
            </Link>
            <Link to="/" className="footer-content-column__link">
              <Mail />
              <u>info@clevertec.ru</u>
            </Link>
          </div>
        </section>
      </div>
      <section className="footer-copyrights-outer">
        <div className="container">
          <div className="footer-copyrights-inner">
            <p className="footer-copyrights-inner__text">
              Copyright © 2032 all rights reserved
            </p>
            <div className="footer-copyrights-inner-cards">
              <img src={stripe} alt="card" />
              <img src={aes} alt="card" />
              <img src={paypal} alt="card" />
              <img src={visa} alt="card" />
              <img src={mastercard} alt="card" />
              <img src={discover} alt="card" />
              <img src={american} alt="card" />
            </div>
            <p className="footer-copyrights-inner__text">
              <a href="https://clevertec.ru/training">
                <u>Clevertec.ru/training</u>
              </a>
            </p>
          </div>
        </div>
      </section>
    </footer>
  );
}
