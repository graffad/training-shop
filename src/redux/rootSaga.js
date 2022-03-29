import { all, fork } from "redux-saga/effects";
import sagaWatcherReview from "./sagas/sagaReviews";
import sagaWatcherProducts from "./sagas/sagaProducts";
import sagaWatcherSubscribe from "./sagas/sagaSubscribe";

export default function* rootSaga() {
    yield all([
        fork(sagaWatcherProducts),
        fork(sagaWatcherReview),
        fork(sagaWatcherSubscribe)
    ]);
}