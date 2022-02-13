import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import TopInfo from "../components/info/TopInfo";
import Products from "../components/products/Products";

export default function CategoryPage() {
  const params = useParams();

  return (
    <Layout>
      <div data-test-id={`products-page-${params.category}`}>
        <TopInfo params={params} />
        <Products showFilters productType={params.category} pagination />
      </div>
    </Layout>
  );
}
