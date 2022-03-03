import { createSlice } from "@reduxjs/toolkit";

const initialState = { products: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // actions
  },
});

// export const { actions } = cartSliceSlice.actions

export default cartSlice.reducer;
