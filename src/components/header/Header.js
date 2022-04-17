import { Link, NavLink, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";
import Cart from "../cart/Cart";
import { headerNav } from "../constants/constants";
// icons
import { ReactComponent as Phone } from "./icons/phone.svg";
import { ReactComponent as Map } from "./icons/map.svg";
import { ReactComponent as Time } from "./icons/time.svg";
import { ReactComponent as Facebook } from "../../images/facebook.svg";
import { ReactComponent as Instagram } from "../../images/instagram.svg";
import { ReactComponent as Twitter } from "../../images/twitter.svg";
import { ReactComponent as Pinterest } from "../../images/pinterest.svg";
import { ReactComponent as SearchSvg } from "./icons/search.svg";
import { ReactComponent as GlobusSvg } from "./icons/globus.svg";
import { ReactComponent as ProfileSvg } from "./icons/profile.svg";
import { ReactComponent as CartSvg } from "./icons/cart.svg";

export default function Header() {
  const cartCounter = useSelector((state) => state.cart.cartSum.num);
  const location = useLocation();
  const [burgerIsActive, setBurgerIsActive] = useState(false);
  const headerRef = useRef(null);
  const [burgerMargin, setBurgerMargin] = useState(90);
  const [isShowCart, setIsShowCart] = useState(false);

  // if too many links and overflow
  function onResize() {
    setBurgerMargin(headerRef.current.offsetHeight);
  }
  // hide burger by click over
  function onClickOver(el) {
    if (!el.className.split(" ").some((cl) => /burger*/.test(cl))) {
      setBurgerIsActive(false);
    }
  }
  useEffect(() => {
    window.addEventListener("resize", onResize);
    document.addEventListener("click", (event) => {
      onClickOver(event.target);
    });
    return () => {
      setBurgerIsActive(false);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("click", onClickOver);
    };
  }, [location]);

  useEffect(() => {
    document.body.classList.remove("fixed-body");
    if (burgerIsActive) {
      document.body.classList.add("fixed-body");
    }
  }, [burgerIsActive]);

  return (
    <>
      <header ref={headerRef} className="header" data-test-id="header">
        <section className="header-contacts-outer">
          <div className="container">
            <div className="header-contacts-inner">
              <div className="header-contacts-inner__item">
                <Phone />
                +375 29 100 20 30
              </div>
              <div className="header-contacts-inner__item">
                <Map />
                Belarus, Gomel, Lange 17
              </div>
              <div className="header-contacts-inner__item">
                <Time />
                All week 24/7
              </div>

              <div className="header-contacts-inner__item social-icons">
                <Facebook className="social-icons__item" />
                <Twitter className="social-icons__item" />
                <Instagram className="social-icons__item" />
                <Pinterest className="social-icons__item" />
              </div>
            </div>
          </div>
        </section>
        <div className="container">
          <section className="header-menu-wrapper">
            <div className="header-logo">
              <Link to="/" data-test-id="header-logo-link">
                CleverShop
              </Link>
            </div>
            <nav className="header-nav" data-test-id="menu">
              {headerNav.map((item) => (
                <NavLink
                  key={item.id}
                  to={`/${item.path}`}
                  data-test-id={`menu-link-${item.path}`}
                  className={({ isActive }) =>
                    classNames("header-nav__item", {
                      "header-nav__item--active": isActive,
                    })
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>
            <div className="header-controls">
              <SearchSvg className="header-controls__item" />
              <GlobusSvg className="header-controls__item" />
              <ProfileSvg className="header-controls__item" />
              <button
                type="button"
                onClick={() => setIsShowCart(!isShowCart)}
                className="header-controls__item"
                data-test-id="cart-button"
              >
                <CartSvg />
                <div className="header-cart-counter">{cartCounter}</div>
              </button>
              <button
                onClick={() => {
                  setBurgerIsActive(!burgerIsActive);
                }}
                type="button"
                data-test-id="burger-menu-btn"
                className={classNames("header-controls__item burger-btn", {
                  "burger-btn--active": burgerIsActive,
                })}
              >
                <span className="burger-btn__icon" />
              </button>
            </div>
          </section>
        </div>
      </header>

      <div
        // calc header height and marin burger
        style={{
          top: `${burgerMargin}px`,
        }}
        className={classNames("burger-menu", {
          "burger-menu--active": burgerIsActive,
        })}
        data-test-id="burger-menu"
      >
        <div className="burger-menu-nav" data-test-id="menu">
          {headerNav.map((item) => (
            <NavLink
              key={item.id}
              to={`/${item.path}`}
              data-test-id={`menu-link-${item.path}`}
              className={({ isActive }) =>
                classNames("burger-menu-nav__item", {
                  "burger-menu-nav__item--active": isActive,
                })
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>

      <Cart isShowCart={isShowCart} setIsShowCart={setIsShowCart} />
    </>
  );
}
