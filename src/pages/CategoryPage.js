import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Layout from "../components/Layout";
import TopInfo from "../components/info/TopInfo";
import Products from "../components/products/Products";
import Loader from "../components/loader/Loader";
import { reduxGetProductsDiff } from "../redux/reducers/productsSlice";
import Alert from "../components/Alert";

export default function CategoryPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const { isLoading, isError } = useSelector((state) => state.productsState);
  useEffect(() => {
    // need to fix payload + url + deps + funcGet after backend filters fix
    dispatch(reduxGetProductsDiff(params.category));
  }, [params]);
  return (
    <Layout>
      {isError ? <Alert errorMessage={isError} /> : ""}
      {isLoading ? <Loader /> : ""}
      <div data-test-id={`products-page-${params.category}`}>
        <TopInfo params={params} />
        <Products showFilters productType={params.category} pagination />
      </div>
    </Layout>
  );
}
