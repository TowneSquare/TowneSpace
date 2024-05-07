import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface dialogStates {
   bTraitPanel: boolean;
   bRemovePanel: boolean;
   bWalletPanel: boolean;
   bWalletHold: boolean;
   bCreateModal: boolean;
};

const initialState: dialogStates = {
   bTraitPanel: false,
   bRemovePanel: false,
   bWalletPanel: false,
   bWalletHold: false,
   bCreateModal: false
}

export const dialogSlice = createSlice({
   name: 'dialog',
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
      toggleConnectRequest: (state, action: PayloadAction<boolean>) => {
         state.bWalletHold = action.payload;
      },
      toggleCreateModal: (state, action: PayloadAction<boolean>) => {
         state.bCreateModal = action.payload;
      }
   },
   extraReducers: (builder) => {

   },
});

export const {
   toggleTraitPanel,
   toggleRemovePanel,
   toggleWalletPanel,
   toggleConnectRequest,
   toggleCreateModal
} = dialogSlice.actions;
export default dialogSlice.reducer;


