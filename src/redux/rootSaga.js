import { all, fork } from "redux-saga/effects";
import sagaWatcherReview from "./sagaReviews";
import sagaWatcher from "./saga";

export default function* rootSaga() {
    yield all([
        fork(sagaWatcher),
        fork(sagaWatcherReview)
    ]);
}