import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import {
  footerNavUseful,
  footerNavInfo,
  footerNavCategories,
} from "../constants/constants";
import { schemaSubscribe } from "../../services/validationSchemas";
import {
  reduxGetSubscribe,
  reduxHideSubscribeSuccess,
} from "../../redux/reducers/subscribeSlice";
// icons
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

export default function Footer() {
  const dispatch = useDispatch();
  const {
    isLoadingSubscribe,
    isErrorSubscribe,
    isSuccessSubscribe,
    errorMessage,
    successMessage,
  } = useSelector((state) => state.subscribeState);
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm({
    defaultValues: { mail: "" },
    resolver: yupResolver(schemaSubscribe),
    mode: "onChange",
  });
  function onSubmitSubscribe(data) {
    dispatch(reduxGetSubscribe({ dataMail: { ...data }, id: 2 }));
  }
  useEffect(() => {
    reset();
    if (isSuccessSubscribe) {
      setTimeout(() => {
        dispatch(reduxHideSubscribeSuccess());
      }, 2000);
    }
  }, [isSuccessSubscribe]);
  return (
    <footer className="footer" data-test-id="footer">
      <section className="footer-intouch-outer">
        <div className="container">
          <div className="footer-intouch-inner">
            <p className="footer-intouch-text">BE IN TOUCH WITH US:</p>
            <form
              action="#"
              className="footer-intouch-form"
              onSubmit={handleSubmit(onSubmitSubscribe)}
            >
              <div style={{ width: "100%" }}>
                <input
                  {...register("mail")}
                  type="text"
                  className="footer-intouch-form__input"
                  placeholder="Enter your email"
                  data-test-id="footer-mail-field"
                />
                {errors.mail && (
                  <p className="promo-subscribe-form__message promo-subscribe-form__message--error">
                    {errors?.mail?.message}
                  </p>
                )}
                {isSuccessSubscribe === 2 && (
                  <p className="promo-subscribe-form__message promo-subscribe-form__message--success">
                    {successMessage}
                  </p>
                )}
                {isErrorSubscribe === 2 && (
                  <p className="promo-subscribe-form__message promo-subscribe-form__message--error">
                    {errorMessage}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="footer-intouch-form__button"
                disabled={isLoadingSubscribe === 2 || !isDirty || !isValid}
                data-test-id="footer-subscribe-mail-button"
              >
                JOIN US{" "}
                {isLoadingSubscribe === 2 && <div className="loader-small" />}
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
              Copyright ?? 2032 all rights reserved
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
