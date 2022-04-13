import { all, fork } from "redux-saga/effects";
import sagaWatcherReview from "./sagas/sagaReviews";
import sagaWatcherProducts from "./sagas/sagaProducts";
import sagaWatcherSubscribe from "./sagas/sagaSubscribe";
import sagaWatcherOrder from "./sagas/sagaOrder";

export default function* rootSaga() {
  yield all([
    sagaWatcherProducts(),
    sagaWatcherReview(),
    sagaWatcherSubscribe(),
    sagaWatcherOrder(),
  ]);
}
