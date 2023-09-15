import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface dialogStates {
   bTraitPanel: boolean;
   bRemovePanel: boolean;
   bWalletPanel: boolean;
   bCreatePanel: boolean;
}

const initialState: dialogStates = {
   bTraitPanel: false,
   bRemovePanel: false,
   bWalletPanel: false,
   bCreatePanel: false,
};

export const dialogSlice = createSlice({
   name: "dialog",
   initialState,
   reducers: {
      toggleTraitPanel: (state, action: PayloadAction<boolean>) => {
         state.bTraitPanel = action.payload;
      },
      toggleRemovePanel: (state, action: PayloadAction<boolean>) => {
         state.bRemovePanel = action.payload;
      },
      toggleWalletPanel: (state, action: PayloadAction<boolean>) => {
         state.bWalletPanel = action.payload;
      },
      toggleCreatePanel: (state, action: PayloadAction<boolean>) => {
         state.bCreatePanel = action.payload;
      },
   },
   extraReducers: (builder) => {},
});

export const { toggleTraitPanel, toggleRemovePanel, toggleWalletPanel, toggleCreatePanel } =
   dialogSlice.actions;
export default dialogSlice.reducer;
