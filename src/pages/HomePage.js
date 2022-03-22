import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Layout from "../components/Layout";
import MainPromo from "../components/promo/MainPromo";
import PromoDelivery from "../components/promo/PromoDelivery";
import PromoProducts from "../components/promo/PromoProducts";
import PromoOffers from "../components/promo/PromoOffers";
import PromoSubscribe from "../components/promo/PromoSubscribe";
import PromoBlog from "../components/promo/PromoBlog";
import Loader from "../components/loader/Loader";
import { reduxGetProductsAll } from "../redux/reducers/productsSlice";
import Alert from "../components/Alert";

export default function HomePage() {
  const dispatch = useDispatch();
  const { isLoading, isError, showAlert } = useSelector(
    (state) => state.productsState
  );
  useEffect(() => {
    dispatch(reduxGetProductsAll());
  }, []);

  return (
    <Layout>
      {isError ? <Alert errorMessage={isError} /> : ""}
      {isLoading ? <Loader /> : ""}
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
