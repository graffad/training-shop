import * as yup from "yup";
import { cartConstTypes } from "../components/constants/constants";

const schemaSubscribe = yup
  .object()
  .shape({
    mail: yup.string().email("неверный email").required("заполните email"),
  })
  .required();

const schemaReview = yup
  .object()
  .shape({
    name: yup.string().required("заполните имя"),
    text: yup.string().required("заполните отзыв"),
    id: yup.string().required(),
    rating: yup.number().min(1).max(5),
  })
  .required();

// =====================================================
// -------------------ORDER-VALIDATION ▼ -------------------
// ======================================================

const {
  POST_OFFICES,
  EXPRESS_DELIVERY,
  STORE_PICKUP,
  PAYPAL,
  VISA,
  MASTER_CARD,
} = cartConstTypes;

function requiredFieldOnDelivery(deliveryMethod) {
  if (deliveryMethod === POST_OFFICES || deliveryMethod === EXPRESS_DELIVERY) {
    return yup.string().required("Поле должно быть заполнено");
  }
}

// object values for combine validation

const step2Values = {
  phone: yup
    .string()
    .required("Поле должно быть заполнено")
    .matches(/^\+375\((33|29|25|44)\)\d{7}$/, "неверный номер"),
  email: yup
    .string()
    .required("Поле должно быть заполнено")
    .email("невеный email"),
  country: yup.string().required("Поле должно быть заполнено"),
  storeAddress: yup.string().when("deliveryMethod", {
    is: STORE_PICKUP,
    then: yup.string().required("Поле должно быть заполнено"),
  }),
  city: yup
    .string()
    .when("deliveryMethod", (deliveryMethod) =>
      requiredFieldOnDelivery(deliveryMethod)
    ),
  street: yup
    .string()
    .when("deliveryMethod", (deliveryMethod) =>
      requiredFieldOnDelivery(deliveryMethod)
    ),
  house: yup
    .string()
    .when("deliveryMethod", (deliveryMethod) =>
      requiredFieldOnDelivery(deliveryMethod)
    ),

  postcode: yup.string().when("deliveryMethod", {
    is: POST_OFFICES,
    then: yup
      .string()
      .required("Поле должно быть заполнено")
      .matches(/[a-zA-Z]{2} \d{6}/, "неверный код"),
  }),
  isConfirmed: yup
    .boolean()
    .oneOf([true], "Вы должны согласиться на обработку личной информации"),
};

const step3Values = {
  cashEmail: yup.string().when("paymentMethod", {
    is: PAYPAL,
    then: yup
      .string()
      .required("Поле должно быть заполнено")
      .email("неверный email"),
  }),
  card: yup.string().when("paymentMethod", (paymentMethod) => {
    if (paymentMethod === VISA || paymentMethod === MASTER_CARD) {
      return yup
        .string()
        .required("Поле должно быть заполнено")
        .matches(/\d{4} \d{4} \d{4} \d{4}/, "неверные данные карты");
    }
  }),

  cardDate: yup.string().when("paymentMethod", (paymentMethod) => {
    if (paymentMethod === VISA || paymentMethod === MASTER_CARD) {
      return yup
        .string()
        .required("Поле должно быть заполнено")
        .test("date", "неверная дата", (val) => {
          const date = val?.split("/");
          const month = parseInt(date?.[0], 10);
          const year = parseInt(date?.[1], 10);
          const currentYear = parseInt(
            new Date().getFullYear().toString().slice(2),
            10
          );
          const currentMonth = new Date().getMonth() + 1;
          const a = year >= currentYear;
          const b = year === currentYear ? month >= currentMonth : a;
          return a && b;
        });
    }
  }),

  cardCVV: yup.string().when("paymentMethod", (paymentMethod) => {
    if (paymentMethod === VISA || paymentMethod === MASTER_CARD) {
      return yup
        .string()
        .required("Поле должно быть заполнено")
        .min(3, "не менее 3х сиволов")
        .max(4, "не более 4х симоволов");
    }
  }),
};

// split diff schemas for validation each step separately

const schemaStep2 = yup.object().shape({
  ...step2Values,
});

const schemaStep3 = yup.object().shape({
  ...step3Values,
});

const schemaOrder = yup.object().shape({
  ...step2Values,
  ...step3Values,
});

export { schemaSubscribe, schemaReview, schemaStep2, schemaStep3, schemaOrder };
