import { configureStore } from "@reduxjs/toolkit";
import tokensSlice from "./tokens";
import dialogSlice from "./dialog";

export const store = configureStore({
  reducer: {
   tokensState: tokensSlice,
   dialogState: dialogSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
