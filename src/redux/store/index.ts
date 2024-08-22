import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage";
import authReducer from "./authSlice";
import { persistStore, persistReducer } from "redux-persist";

// Configuration for redux-persist
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

// Create a persistor
export const persistor = persistStore(store);

export default store;
