import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import cartSlice from "./reducers/cartSlice";
import productsSlice from "./reducers/productsSlice";
import subscribeSlice from "./reducers/subscribeSlice";
import reviewSlice from "./reducers/reviewSlice";
import orderSlice from "./reducers/orderSlice";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  cart: cartSlice,
  productsState: productsSlice,
  subscribeState: subscribeSlice,
  reviewState: reviewSlice,
  orderState:orderSlice
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

export default store;

sagaMiddleware.run(rootSaga);
