import person1 from "./images/person1.png"
import person2 from "./images/person2.png"



export default function PromoSubscribe() {
  return (
    <section className="promo-subscribe-outer">
      <div className="container">
        <div className="promo-subscribe-inner">
          <form className="promo-subscribe-form">
            <img src={person1} className="promo-subscribe-form__img1" alt=""/>
            <img src={person2} className="promo-subscribe-form__img2" alt=""/>
            <p className="promo-subscribe-form__header">Special Offer</p>
            <p className="promo-subscribe-form__text">
              Subscribe <br /> And
              <span> Get 10% Off</span>
            </p>
            <input
              className="promo-subscribe-form__input"
              type="email"
              placeholder="Enter your email"
            />
            <button className="promo-subscribe-form__button" type="submit">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
