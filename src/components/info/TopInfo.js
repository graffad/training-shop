import { Link } from "react-router-dom";
import { ReactComponent as Share } from "../../images/share.svg";

export default function TopInfo({ params,productData }) {
  // title direct from params???? too bad
  return (
    <section className="top-info">
      <div className="container">
        <div className="top-info__breadcrumbs">
          <Link to="/">Home</Link>
          <Link
            to={`/${params.category}`}
            style={{ textTransform: "capitalize" }}
          >
            &nbsp; ► {params.category}
          </Link>

          {params.id ? (
            <Link to={`/${params.category}/${params.id}`}>
              &nbsp; ► {productData?.name}
            </Link>
          ) : (
            ""
          )}
          <p className="top-info__share share">
            <span>
              <Share />
            </span>
            Share
          </p>
        </div>
        <h1
          className={`top-info__title ${
            params.id ? "top-info__title--big" : ""
          }`}
        >
          {params.id ? productData?.name: params.category}
        </h1>
      </div>
    </section>
  );
}
