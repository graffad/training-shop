import * as yup from "yup";

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

export { schemaSubscribe, schemaReview };
