import { call, put, takeEvery } from "redux-saga/effects";
import UserService from "../services/userService";
import {
  reduxSetProducts,
  reduxGetProductsDiff,
  reduxSetProductsError,
  reduxGetProductsAll,
  reduxGetProductProfile,
  reduxSetProductProfile,
  reduxSetProductsProfileError,
} from "./reducers/productsSlice";

function* sagaWorkerProductsAll() {
  try {
    const res = yield call(UserService.getProductsAll);
    yield put(reduxSetProducts(res.data));
  } catch (e) {
    yield put(reduxSetProductsError("ошибка загрузки продуктов"));
  }
}

// for filters backend

function* sagaWorkerProductsDiff({ payload }) {
  try {
    const res = yield call(() => UserService.getProductsDiff(payload));
    yield put(reduxSetProducts(res.data));
  } catch (e) {
    yield put(reduxSetProductsError("ошибка загрузки продуктов"));
  }
}

function* sagaWorkerProductProfile({ payload }) {
  try {
    const res = yield call(() => UserService.getProduct(payload));
    yield put(reduxSetProductProfile(res.data));
  } catch (e) {
    yield put(reduxSetProductsProfileError("ошибка загрузки продукта"));
  }
}

export default function* sagaWatcher() {
  yield takeEvery(reduxGetProductsAll, sagaWorkerProductsAll);
  yield takeEvery(reduxGetProductsDiff, sagaWorkerProductsDiff);
  yield takeEvery(reduxGetProductProfile, sagaWorkerProductProfile);
}
