import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/ProductSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
