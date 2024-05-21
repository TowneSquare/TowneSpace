import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface dialogStates {
  bTraitPanel: boolean;
  bRemovePanel: boolean;
  bWalletPanel: boolean;
  bWalletHold: boolean;
  bCreateModal: boolean;
  bStep2: boolean;
}

const initialState: dialogStates = {
  bTraitPanel: false,
  bRemovePanel: false,
  bWalletPanel: false,
  bWalletHold: false,
  bCreateModal: false,
  bStep2: false,
};

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
    },
    toggleStep2: (state, action: PayloadAction<boolean>) => {
      state.bStep2 = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const {
  toggleTraitPanel,
  toggleRemovePanel,
  toggleWalletPanel,
  toggleConnectRequest,
  toggleCreateModal,
  toggleStep2,
} = dialogSlice.actions;
export default dialogSlice.reducer;
