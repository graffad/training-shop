import { ReactComponent as Star } from "./icons/star.svg";

export default function StarsRate({ rate = 0 }) {
  return (
    <div className="stars">
      {[...Array(5)].map((star, ind) => (
        <Star
          className={`stars__item ${ind >= rate ? "" : "stars__item--gold"}`}
          key={ind}
        />
      ))}
    </div>
  );
}
