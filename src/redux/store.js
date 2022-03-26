import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import cartSlice from "./reducers/cartSlice";
import productsSlice from "./reducers/productsSlice";
import subscribeSlice from "./reducers/subscribeSlice";
import sagaWatcher from "./saga";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  cart: cartSlice,
  productsState: productsSlice,
  subscribeState: subscribeSlice
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

export default store;

sagaMiddleware.run(sagaWatcher);
