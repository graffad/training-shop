import { createSlice } from "@reduxjs/toolkit";

const initialState = { products: [], cartSum: { num: 0, totalPrice: 0 } };

function countCart(data) {
  const num = data.length;
  let totalPrice = 0;
  for (let i = 0; i < data?.length; i += 1) {
    // num += data[i].quantity;
    totalPrice += data[i].quantity * data[i].price;
  }
  return { num, totalPrice };
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // actions
    reduxSetCart(state, action) {
      state.products = action.payload;
      state.cartSum = countCart(action.payload);
    },
  },
});

export const { reduxSetCart } = cartSlice.actions;

export default cartSlice.reducer;
