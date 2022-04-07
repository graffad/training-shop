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


// =====================================================
// -------------------ORDER-VALIDATION ▼ -------------------
// ======================================================


// object values for combine validation


const step2Values={
    // values
}
const step3Values = {
   // values
}

// split diff schemas for validation each step separately

const schemaStep1 = yup.object().shape({
  // cartItems,
});
const schemaStep2 = yup.object().shape({
 ...step2Values
});

const schemaStep3 = yup.object().shape({
    ...step3Values
});

const schemaOrder = yup.object().shape({
    ...step2Values,...step3Values
})

export { schemaSubscribe, schemaReview,schemaStep1, schemaStep2, schemaStep3, schemaOrder };
