import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoadingSubscribe: false,
  isErrorSubscribe: false,
  isSuccessSubscribe: false,
  errorMessage:false,
  successMessage:"почта успешно отправлена"
};

const subscribeSlice = createSlice({
  name: "subscribe",
  initialState,
  reducers: {
    // actions
    reduxGetSubscribe(state, action) {
      state.isErrorSubscribe = false;
      state.errorMessage = false;
      state.isSuccessSubscribe = false;
      // for diff form input or can be removed by formState
      state.isLoadingSubscribe = action.payload.id
    },
    reduxSetSubscribeSuccess(state, action) {
      state.isLoadingSubscribe = false;
      state.isSuccessSubscribe = action.payload.id;
    },
    reduxSetSubscribeError(state, action) {
      state.isLoadingSubscribe = false;
      state.isSuccessSubscribe = false;
      state.isErrorSubscribe = action.payload.id;
      state.errorMessage = action.payload.errorMessage
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
