import Layout from "../components/Layout";
import MainPromo from "../components/promo/MainPromo";
import PromoDelivery from "../components/promo/PromoDelivery";
import PromoProducts from "../components/promo/PromoProducts";
import PromoOffers from "../components/promo/PromoOffers";
import PromoSubscribe from "../components/promo/PromoSubscribe";
import PromoBlog from "../components/promo/PromoBlog";

export default function HomePage() {
  return (
    <Layout>
      <MainPromo />
      <PromoDelivery />
      <PromoProducts productType="women" />
      <PromoProducts productType="men" />
      <PromoOffers />
      <PromoSubscribe />
      <PromoBlog />
    </Layout>
  );
}
