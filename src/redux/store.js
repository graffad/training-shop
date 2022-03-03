import {
  configureStore,
  combineReducers,
} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import cartSlice from "./reducers/cartSlice";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  cart: cartSlice,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

export default store

// sagaMiddleware.run(rootSaga);
