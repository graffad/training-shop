import { Link, NavLink } from "react-router-dom";
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
import { headerNav } from "../constants/constants";

export default function Header() {
  return (
    <header className="header" data-test-id="header">
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
                  isActive ? "header-nav__item--active" : "header-nav__item"
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
            <div className="header-controls__item">
              <CartSvg />
              <div className="header-cart-counter">2</div>
            </div>
          </div>
        </section>
      </div>
    </header>
  );
}