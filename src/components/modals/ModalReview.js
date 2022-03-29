import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Star } from "../products/icons/star.svg";
import { schemaReview } from "../../services/validationSchemas";
import {
  reduxCreateReviewReq,
  reduxHideModalReview,
} from "../../redux/reducers/reviewSlice";

export default function ModalReview() {
  const [starState, setStarState] = useState(1);
  const [starHover, setStarHover] = useState(undefined);
  const params = useParams();
  const dispatch = useDispatch();
  const { isLoadingReviewReq, isErrorCreateReviewReq, showModalReview } =
    useSelector((state) => state.reviewState);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { rating: 1, id: "", name: "", text: "" },
    resolver: yupResolver(schemaReview),
  });

  function hideModalOnClickOver(event) {
    if (event.target.className === "modal-reviews-wrapper") {
      dispatch(reduxHideModalReview());
    }
  }

  useEffect(() => {
    document.addEventListener("click", (event) => hideModalOnClickOver(event));
    return () =>
      document.removeEventListener("click", (e) => hideModalOnClickOver(e));
  }, []);
  useEffect(() => {
    setStarState(1);
    reset();
    setValue("id", params.id);
    document.body.classList.remove("fixed-body");
    if (showModalReview) {
      document.body.classList.add("fixed-body");
    }
  }, [showModalReview, params]);

  function onSubmitReview(data) {
    dispatch(reduxCreateReviewReq(data));
  }

  if (!showModalReview) {
    return "";
  }
  return (
    <div className="modal-reviews-wrapper">
      <div className="modal-reviews-inner" data-test-id="review-modal">
        <button
          type="button"
          className="modal-reviews-btn-close"
          onClick={() => {
            dispatch(reduxHideModalReview());
          }}
        >
          &#10006;
        </button>
        <h3 className="modal-reviews-header">White a review</h3>
        <div className="stars">
          {[...Array(5)].map((star, ind) => (
            // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
            <button
              type="button"
              key={ind}
              className="stars__btn"
              onClick={() => {
                setStarState(ind + 1);
                setValue("rating", ind + 1, { shouldValidate: true });
              }}
              onMouseOver={() => setStarHover(ind + 1)}
              onMouseLeave={() => setStarHover(undefined)}
            >
              <Star
                className={`stars__item ${
                  (starHover || starState) >= ind + 1 ? "stars__item--gold" : ""
                }`}
              />
            </button>
          ))}
        </div>
        <form
          className="modal-reviews-form"
          onSubmit={handleSubmit(onSubmitReview)}
        >
          <input
            type="text"
            placeholder="Введите имя"
            className="modal-reviews-form__input"
            {...register("name")}
            data-test-id="review-name-field"
          />
          {errors.name && (
            <p className="modal-reviews-form__error">{errors?.name?.message}</p>
          )}
          <textarea
            rows={10}
            name=""
            id=""
            className="modal-reviews-form__textarea"
            placeholder="Введите текст"
            {...register("text")}
            data-test-id="review-text-field"
          />
          {errors.text && (
            <p className="modal-reviews-form__error">{errors?.text?.message}</p>
          )}
          {errors.id && (
            <p className="modal-reviews-form__error">{errors?.id?.message}</p>
          )}
          {errors.rating && (
            <p className="modal-reviews-form__error">
              {errors?.rating?.message}
            </p>
          )}
          <button
            type="submit"
            className="modal-reviews-form__button"
            disabled={isLoadingReviewReq}
            data-test-id="review-submit-button"
          >
            Submit {isLoadingReviewReq && <div className="loader-small" />}
          </button>
          {isErrorCreateReviewReq && (
            <p className="modal-reviews-form__error">
              {isErrorCreateReviewReq}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
