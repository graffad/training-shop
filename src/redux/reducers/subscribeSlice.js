import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoadingSubscribe: false,
  isErrorSubscribe: false,
  isSuccessSubscribe: false,
};

const subscribeSlice = createSlice({
  name: "subscribe",
  initialState,
  reducers: {
    // actions
    reduxGetSubscribe(state, action) {
      state.isErrorSubscribe = false;
      state.isSuccessSubscribe = false;
      state.isLoadingSubscribe = true;
    },
    reduxSetSubscribeSuccess(state, action) {
      state.isLoadingSubscribe = false;
      state.isSuccessSubscribe = action.payload;
    },
    reduxSetSubscribeError(state, action) {
      state.isLoadingSubscribe = false;
      state.isSuccessSubscribe = false;
      state.isErrorSubscribe = action.payload;
    },
    reduxHideSubscribeSuccess(state) {
      state.isSuccessSubscribe = false;
    },
  },
});

export const {
  reduxGetSubscribe,
  reduxSetSubscribeSuccess,
  reduxSetSubscribeError,
  reduxHideSubscribeSuccess,
} = subscribeSlice.actions;

export default subscribeSlice.reducer;
