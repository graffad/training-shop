import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import person1 from "./images/person1.png";
import person2 from "./images/person2.png";
import { schemaSubscribe } from "../../services/validationSchemas";
import {
  reduxGetSubscribe,
  reduxHideSubscribeSuccess,
} from "../../redux/reducers/subscribeSlice";

export default function PromoSubscribe() {
  const dispatch = useDispatch();
  const {
    isLoadingSubscribe,
    isErrorSubscribe,
    isSuccessSubscribe,
    errorMessage,
    successMessage,
  } = useSelector((state) => state.subscribeState);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { mail: "" },
    resolver: yupResolver(schemaSubscribe),
  });

  function onSubmitSubscribe(data) {
    dispatch(reduxGetSubscribe({ dataMail: { ...data }, id: 1 }));
  }
  useEffect(() => {
    reset();
    if (isSuccessSubscribe) {
      setTimeout(() => {
        dispatch(reduxHideSubscribeSuccess());
      }, 2000);
    }
  }, [isSuccessSubscribe]);

  return (
    <section className="promo-subscribe-outer">
      <div className="container">
        <div className="promo-subscribe-inner">
          <form
            className="promo-subscribe-form"
            onSubmit={handleSubmit(onSubmitSubscribe)}
          >
            <img src={person1} className="promo-subscribe-form__img1" alt="" />
            <img src={person2} className="promo-subscribe-form__img2" alt="" />
            <p className="promo-subscribe-form__header">Special Offer</p>
            <p className="promo-subscribe-form__text">
              Subscribe <br /> And
              <span> Get 10% Off</span>
            </p>
            <input
              {...register("mail")}
              className="promo-subscribe-form__input"
              type="email"
              placeholder="Enter your email"
            />
            {errors.mail && (
              <p className="promo-subscribe-form__message promo-subscribe-form__message--error">
                {errors?.mail?.message}
              </p>
            )}

            {isSuccessSubscribe === 1 && (
              <p className="promo-subscribe-form__message promo-subscribe-form__message--success">
                {successMessage}
              </p>
            )}
            {isErrorSubscribe === 1 && (
              <p className="promo-subscribe-form__message promo-subscribe-form__message--error">
                {errorMessage}
              </p>
            )}

            <button
              className="promo-subscribe-form__button"
              type="submit"
              disabled={isLoadingSubscribe === 1}
            >
              Subscribe{" "}
              {isLoadingSubscribe === 1 && <div className="loader-small" />}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
