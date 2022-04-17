import { createSlice } from "@reduxjs/toolkit";
import {cartConstTypes} from "../../components/constants/constants";

const {COUNTRIES,CITIES} = cartConstTypes
// all order form values is unnecessary here
// only requested + loading + errors state
const initialState = {
  isLoading: false,
  storeCountries: [],
  storeCities: [],
  errorType: false,
  errorMessage: "",
};

const orderSlice = createSlice({
  name: "orderState",
  initialState,
  reducers: {
    // actions
    reduxGetOrderCountries(state, action) {
      state.isLoading = COUNTRIES;
      state.errorType = false;
    },
    reduxGetOrderStores(state, action) {
      state.isLoading = CITIES;
      state.errorType = false;
    },
    reduxSetOrderCountries(state, action) {
      state.storeCountries = action.payload;
      state.isLoading = false;
      state.errorType = false;
    },
    reduxSetOrderStores(state, action) {
      state.storeCities = action.payload;
      state.isLoading = false;
      state.errorType = false;
    },
    reduxSetOrderError(state, action) {
      state.isLoading = false;
      // types : countries / cities / order
      const { errorType, errorMessage } = action.payload;
      state.errorType = errorType;
      state.errorMessage = errorMessage;
    },
  },
});

export const {
  reduxGetOrderCountries,
  reduxSetOrderCountries,
  reduxGetOrderStores,
  reduxSetOrderStores,
  reduxSetOrderError,
} = orderSlice.actions;

export default orderSlice.reducer;
