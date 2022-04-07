import { call, put, takeEvery } from "redux-saga/effects";
import UserService from "../../services/userService";

import {
  reduxGetOrderStoresInfo,
  reduxSetOrderStoresInfo,
  reduxSetOrderError,
} from "../reducers/orderSlice";

function* sagaWorkerOrder({payload}) {
  try {
    if(payload.type === "countries"){
      const res = yield call(() => UserService.getCountries());
      yield put(reduxSetOrderStoresInfo({type:payload.type,data:res.data}));
    }
    if(payload.type === "cities"){
      const {city,country} = payload.search
      const res = yield call(() => UserService.getCities(city,country));
      yield put(reduxSetOrderStoresInfo({type:payload.type,data:res.data}));
    }

  } catch (e) {
    yield put(
      reduxSetOrderError({
        error: payload.type,
        errorMessage: "ошибка загрузки",
      })
    );
  }
}

export default function* sagaWatcherOrder() {
  yield takeEvery(reduxGetOrderStoresInfo, sagaWorkerOrder);
}
