import { Link } from "react-router-dom";
import Posts from "../blog/Posts";

export default function PromoBlog(props) {
  return (
    <section className="promo-blog-outer">
      <div className="container">
        <div className="promo-blog-inner">
          <h2 className="promo-blog-inner__header">LATEST FROM BLOG</h2>
          <Link to="/" className="promo-blog-inner__link">
            SEE ALL
          </Link>
        </div>
        <Posts />
      </div>
    </section>
  );
}
