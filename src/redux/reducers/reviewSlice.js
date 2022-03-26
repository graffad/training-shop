import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoadingReviewReq: false,
  isErrorCreateReviewReq: false,
  showModalReview: false,
};

const reviewSlice = createSlice({
  name: "reviewState",
  initialState,
  reducers: {
    // actions
    reduxCreateReviewReq(state, action) {
      state.isErrorCreateReviewReq = false;
      state.isLoadingReviewReq = true;
    },
    reduxCreateReviewReqSuccess(state, action) {
      state.isLoadingReviewReq = false;
      state.isErrorCreateReviewReq = false;
      state.showModalReview = false;
    },
    reduxCreateReviewReqError(state, action) {
      state.isLoadingReviewReq = false;
      state.isErrorCreateReviewReq = action.payload;
    },
    reduxShowModalReview(state) {
      state.showModalReview = true;
    },
    reduxHideModalReview(state) {
      state.showModalReview = false;
    },
  },
});

export const {
  reduxCreateReviewReq,
  reduxCreateReviewReqError,
  reduxCreateReviewReqSuccess,
  reduxHideModalReview,
  reduxShowModalReview,
} = reviewSlice.actions;

export default reviewSlice.reducer;
