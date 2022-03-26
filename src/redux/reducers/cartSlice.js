import { createSlice } from "@reduxjs/toolkit";

const initialState = { products: [], cartSum: { num: 0, totalPrice: 0 } };

function countCart(data) {
  const num = data.length;
  const totalPrice = data.reduce(
    (prev, item) => prev + item.quantity * item.price,0
  );
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
