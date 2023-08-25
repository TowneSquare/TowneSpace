import { configureStore } from "@reduxjs/toolkit";
import nftSlice from "./nfts";
import collectionsSlice from "./collections";

export const store = configureStore({
  reducer: {
   nftsState: nftSlice,
   collectionsState: collectionsSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
