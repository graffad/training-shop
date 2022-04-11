import { createSlice } from "@reduxjs/toolkit";

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
    reduxGetOrderStoresInfo(state, action) {
      // payload : {type: countries or cities, search: {city:qwe, country:"sss"} }
      state.isLoading = action.payload.type;
      state.errorType = false;
    },
    reduxSetOrderStoresInfo(state, action) {
      const resultCountries = action.payload.data.map((item) => ({
        value: item.name,
        label: item.name,
      }));

      const resultCities = action.payload.data.map(item =>({
        value: item.city,
        label: item.city,
      }))
      if (action.payload.type === "countries") {
        state.storeCountries = resultCountries;
      } else state.storeCities = resultCities;
      state.isLoading = false;
      state.errorType = false;
    },
    reduxSetOrderError(state, action) {
      state.isLoading = false;
      // types : countries / cities / order
      state.errorType = action.payload.error;
      state.errorMessage = action.payload.errorMessage;
    },
  },
});

export const {
  reduxGetOrderStoresInfo,
  reduxSetOrderStoresInfo,
  reduxSetOrderError,
} = orderSlice.actions;

export default orderSlice.reducer;
