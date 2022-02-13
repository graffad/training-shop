import postImg1 from "./tmp/post1.jpg";
import postImg2 from "./tmp/post2.jpg";
import postImg3 from "./tmp/post3.jpg";

export default function Posts(props) {
  return (
    <div className="posts-inner">
      <div className="posts-inner-card">
        <div className="posts-inner-card__image">
          <img src={postImg1} alt="" />
        </div>
        <div className="posts-inner-card__preview">
          <h4 className="posts-inner-card__preview-header">
            The Easiest Way to Break
          </h4>
          <p className="posts-inner-card__preview-text">
            But I must explain to you how all this mistaken idea of denouncing
            pleas and praising pain was bor
          </p>
        </div>
      </div>

      <div className="posts-inner-card">
        <div className="posts-inner-card__image">
          <img src={postImg2} alt="" />
        </div>
        <div className="posts-inner-card__preview">
          <h4 className="posts-inner-card__preview-header">Wedding Season</h4>
          <p className="posts-inner-card__preview-text">
            But I must explain to you how all this mistaken idea of denouncing
            pleas and praising pain was bor
          </p>
        </div>
      </div>

      <div className="posts-inner-card">
        <div className="posts-inner-card__image">
          <img src={postImg3} alt="" />
        </div>
        <div className="posts-inner-card__preview">
          <h4 className="posts-inner-card__preview-header">
            Recent Favorites On Repeat
          </h4>
          <p className="posts-inner-card__preview-text">
            But I must explain to you how all this mistaken idea of denouncing
            pleas and praising pain was bor
          </p>
        </div>
      </div>
    </div>
  );
}
