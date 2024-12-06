import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import logger from 'redux-logger'
import { configureStore } from "@reduxjs/toolkit";
// import {
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";

import thunk from "redux-thunk";
import { userReducer } from "../reducer/userReducer";
import { instructorReducer } from "../reducer/instructorReducer";
import { cartReducer } from "../reducer/cartReducer";
import { bookingReducer, creditReducer } from "../reducer/bookingReducer";
import { activeBooking } from "../reducer/active_bookingReducer";
import { adminReducer } from "../reducer/admin_reducer";
import { adminDataReducer } from "../reducer/admin_dataReducer";
import { adminSuburbs, suburbReducer } from "../reducer/suburbs_reducer";
import { priceReducer } from "../reducer/price_reducer";
import { sendPromiseReducer } from "../reducer/promise/sendPromise_reducer";
import financialReportsReducer from "../reducer/financialReportsReducer";

// root reducer
const rootReducer = combineReducers({
  user: userReducer,
  instructor: instructorReducer,
  cart: cartReducer,
  credit: creditReducer,
  booking: bookingReducer,
  activeBooking: activeBooking,
  admin: adminReducer,
  adminData: adminDataReducer,
  suburb: suburbReducer,
  lessonPrice: priceReducer,
  adminSuburbs: adminSuburbs,
  sendPromise: sendPromiseReducer,
  financialReports: financialReportsReducer,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["adminData", "sendPromise"],
};

// created reducer to be persisted at local storage
const persistedReducer = persistReducer(persistConfig, rootReducer);

//

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export default store;
