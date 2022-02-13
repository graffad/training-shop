export default function PromoOffers(props) {
  return (
    <section className="promo-offers-outer">
      <div className="container">
        <div className="promo-offers-inner">
          <div className="promo-offers-inner__item">
            <div className="promo-offers-banner">
              <p className="promo-offers-banner__header">New Season</p>
              <p className="promo-offers-banner__text">lookbook collection</p>
            </div>
          </div>
          <div className="promo-offers-inner__item">
            <div className="promo-offers-banner">
              <p className="promo-offers-banner__header">Sale</p>
              <p className="promo-offers-banner__text">
                Get UP to <span>50% off</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
