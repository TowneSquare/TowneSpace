import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface dialogStates {
  bTraitPanel: boolean;
  bRemovePanel: boolean;
  bWalletPanel: boolean;
  bWalletHold: boolean;
  bCreateModal: boolean;
  bStep2: boolean;
  bViewNFTModal: boolean;
  bTraitRemove: boolean;
  bRemoveTraitConfirm: boolean;
  bChooseTrait: boolean;
  bExitEdit: boolean;
  bFinishEdit: boolean;
  bSetModal: boolean;
}

const initialState: dialogStates = {
  bTraitPanel: false,
  bRemovePanel: false,
  bWalletPanel: false,
  bWalletHold: false,
  bCreateModal: false,
  bStep2: false,
  bViewNFTModal: false,
  bTraitRemove: false,
  bRemoveTraitConfirm: false,
  bChooseTrait: false,
  bExitEdit: false,
  bFinishEdit: false,
  bSetModal: false,
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
    toggleViewNFTModal: (state, action: PayloadAction<boolean>) => {
      state.bViewNFTModal = action.payload;
    },
    toggleRemoveTrait: (state, action: PayloadAction<boolean>) => {
      state.bTraitRemove = action.payload;
    },
    toggleRemoveTraitConfirm: (state, action: PayloadAction<boolean>) => {
      state.bRemoveTraitConfirm = action.payload;
    },
    toggleChooseTrait: (state, action: PayloadAction<boolean>) => {
      state.bChooseTrait = action.payload;
    },
    toggleExitEdit: (state, action: PayloadAction<boolean>) => {
      state.bExitEdit = action.payload;
    },
    toggleFinishEdit: (state, action: PayloadAction<boolean>) => {
      state.bFinishEdit = action.payload;
    },
    toggleSettingModal: (state, action: PayloadAction<boolean>) => {
      state.bSetModal = action.payload;
    },
  },
  extraReducers: (builder) => { },
});

export const {
  toggleTraitPanel,
  toggleRemovePanel,
  toggleWalletPanel,
  toggleConnectRequest,
  toggleCreateModal,
  toggleStep2,
  toggleViewNFTModal,
  toggleRemoveTrait,
  toggleRemoveTraitConfirm,
  toggleChooseTrait,
  toggleExitEdit,
  toggleFinishEdit,
  toggleSettingModal,
} = dialogSlice.actions;
export default dialogSlice.reducer;
