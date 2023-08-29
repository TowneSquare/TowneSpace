import { configureStore } from "@reduxjs/toolkit";
import tokensSlice from "./tokens";

export const store = configureStore({
  reducer: {
   tokensState: tokensSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
