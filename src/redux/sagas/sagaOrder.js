import { call, put, takeEvery } from "redux-saga/effects";
import UserService from "../../services/userService";

import {
  reduxSetOrderCountries,
  reduxSetOrderError,
  reduxGetOrderCountries,
  reduxGetOrderStores,
  reduxSetOrderStores,
} from "../reducers/orderSlice";

function* sagaWorkerOrderCountries() {
  try {
    const res = yield call(() => UserService.getCountries());
    const data = res.data.map((item) => ({
      value: item.name,
      label: item.name,
    }));
    yield put(reduxSetOrderCountries(data));
  } catch (e) {
    yield put(
      reduxSetOrderError({
        errorType: "countries",
        errorMessage: "ошибка загрузки",
      })
    );
  }
}

function* sagaWorkerOrderStores({ payload }) {
  try {
    const { city, country } = payload;
    if (city && country) {
      const res = yield call(() => UserService.getCities(city, country));
      const data = res.data.map((item) => ({
        value: item.city,
        label: item.city,
      }));
      yield put(reduxSetOrderStores(data));
    } else yield put(reduxSetOrderStores(payload));
  } catch (e) {
    yield put(
      reduxSetOrderError({
        errorType: "cities",
        errorMessage: "ошибка загрузки",
      })
    );
  }
}

export default function* sagaWatcherOrder() {
  yield takeEvery(reduxGetOrderCountries, sagaWorkerOrderCountries);
  yield takeEvery(reduxGetOrderStores, sagaWorkerOrderStores);
}
