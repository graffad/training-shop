import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: { men: [], women: [] },
  productData: {},
  isLoading: true,
  isLoadingProfile: true,
  isError: false,
  isErrorProfile:false
};

const cartSlice = createSlice({
  name: "productsState",
  initialState,
  reducers: {
    // actions
    reduxSetProducts(state, action) {
      state.products = action.payload;
      state.isLoading = false;
    },
    reduxSetProductProfile(state, action) {
      state.productData = action.payload;
      state.isLoadingProfile = false;
    },
    reduxGetProductProfile(state, action) {
      state.isErrorProfile = false;
      state.isLoadingProfile = true;
    },
    reduxGetProductsAll(state) {
      state.isError = false;
      state.isLoading = true;
    },
    reduxGetProductsDiff(state, action) {
      state.isError = false;
      state.isLoading = true;
    },
    // reduxHideLoader(state) {
    //   state.isLoading = false;
    // },

    reduxHideAlert(state,action) {
      state.isError = false;
      if(action.payload === true){
        state.isErrorProfile = null
      }
    },
    reduxSetProductsError(state, action) {
      state.isLoading = false;
      state.isError = action.payload;
    },
    reduxSetProductsProfileError(state, action) {
      state.isLoadingProfile = false;
      state.isErrorProfile = action.payload;
    },
  },
});

export const {
  reduxSetProducts,
  reduxGetProductsAll,
  reduxGetProductsDiff,
  reduxSetProductsError,
  reduxGetProductProfile,
  reduxSetProductProfile,
  reduxHideAlert,
  reduxSetProductsProfileError,
} = cartSlice.actions;

export default cartSlice.reducer;
