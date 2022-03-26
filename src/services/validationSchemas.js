import * as yup from "yup";

const schemaSubscribe = yup
  .object()
  .shape({
    mail: yup.string().email("неверный email").required("заполните email"),
  })
  .required();



// eslint-disable-next-line import/prefer-default-export
export  {schemaSubscribe}