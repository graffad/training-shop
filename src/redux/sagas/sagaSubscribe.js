import { call, put, takeEvery } from "redux-saga/effects";
import UserService from "../../services/userService";

import {
  reduxGetSubscribe,
  reduxSetSubscribeSuccess,
  reduxSetSubscribeError,
} from "../reducers/subscribeSlice";

// for email subscribe
function* sagaWorkerSubscribe({ payload }) {
  try {
    const res = yield call(() => UserService.createSubscribe(payload.dataMail));
    if (res.status === 200) {
      yield put(reduxSetSubscribeSuccess({id:payload.id}));
    }
  } catch (e) {
    yield put(reduxSetSubscribeError({id:payload.id,errorMessage:"ошибка отправки почты"}));
  }
}

export default function* sagaWatcherSubscribe() {
  yield takeEvery(reduxGetSubscribe, sagaWorkerSubscribe);
}

