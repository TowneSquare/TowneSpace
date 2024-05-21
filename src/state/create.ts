import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import FolderType from '../type/folder_type';

interface createStates {
  collectionName: string;
  totalMaxSupply: string;
  traits: FolderType[];
  primaryTrait: FolderType | undefined;
}

const initialState: createStates = {
  collectionName: '',
  totalMaxSupply: '',
  traits: [],
  primaryTrait: undefined,
};

export const createflowSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    updateCollectionName: (state, action: PayloadAction<string>) => {
      state.collectionName = action.payload;
    },
    updateTotalMaxSupply: (state, action: PayloadAction<string>) => {
      state.totalMaxSupply = action.payload;
    },
    updateTraits: (state, action: PayloadAction<FolderType[]>) => {
      state.traits = action.payload;
    },
    updatePrimaryTrait: (state, action: PayloadAction<FolderType>) => {
      state.primaryTrait = action.payload;
    },
    updateRarities: (
      state,
      action: PayloadAction<{ iFolder: number; iFile: number; value: number }>
    ) => {
      state.traits[action.payload.iFolder].files[
        action.payload.iFile
      ].rarities = action.payload.value;
    },
    updateIsIncluded: (
      state,
      action: PayloadAction<{ iFolder: number; iFile: number; value: boolean }>
    ) => {
      state.traits[action.payload.iFolder].files[
        action.payload.iFile
      ].isIncluded = action.payload.value;
    },
  },
});

export const {
  updateCollectionName,
  updateTotalMaxSupply,
  updateTraits,
  updatePrimaryTrait,
  updateRarities,
  updateIsIncluded,
} = createflowSlice.actions;
export default createflowSlice.reducer;
