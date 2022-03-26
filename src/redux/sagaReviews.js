import { call, put, takeEvery } from "redux-saga/effects";
import UserService from "../services/userService";
import {
  reduxCreateReviewReq,
  reduxCreateReviewReqError,
  reduxCreateReviewReqSuccess,
  reduxHideModalReview,
  reduxShowModalReview,
} from "./reducers/reviewSlice";
import {reduxGetProductProfile} from "./reducers/productsSlice";


function* sagaWorkerReview({ payload }) {
  try {
    const res = yield call(() => UserService.createReview(payload));
    if (res.status === 200) {
      yield put(reduxCreateReviewReqSuccess());
      yield put(reduxGetProductProfile(payload.id))
    }
  } catch (e) {
    yield put(reduxCreateReviewReqError("ошибка загрузки отзыва"));
  }
}

export default function* sagaWatcherReview() {
  yield takeEvery(reduxCreateReviewReq, sagaWorkerReview);
}
