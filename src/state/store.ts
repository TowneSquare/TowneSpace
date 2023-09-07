import { configureStore } from "@reduxjs/toolkit";
import tokensSlice from "./tokens";
import dialogSlice from "./dialog";
import createflowSlice from "./create";
import deploySlice from "./deploy";

export const store = configureStore({
  reducer: {
   tokensState: tokensSlice,
   dialogState: dialogSlice,
   createState: createflowSlice,
   deployState: deploySlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
