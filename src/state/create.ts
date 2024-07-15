import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import FolderType, {
  AssetImageData,
  ImageMetadata,
  TokenType,
} from '../type/folder_type';

interface createStates {
  traits: FolderType[];
  step: number;
  primaryTrait: FolderType | undefined;
  assetsToDownloadMetaData: ImageMetadata[];
  assetimages: AssetImageData[];
}

const initialState: createStates = {
  step: 0,
  traits: [],
  primaryTrait: undefined,
  assetsToDownloadMetaData: [],
  assetimages: [],
};

export const createflowSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    updateTraits: (state, action: PayloadAction<FolderType[]>) => {
      state.traits = action.payload;
    },
    updatePrimaryTrait: (state, action: PayloadAction<FolderType>) => {
      state.primaryTrait = action.payload;
    },
    updateStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
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
    updateRarityNumber: (
      state,
      action: PayloadAction<{ iFolder: number; iFile: number; value: number }>
    ) => {
      state.traits[action.payload.iFolder].files[
        action.payload.iFile
      ].rarityNumber = action.payload.value;
    },
  },
});

export const {
  updateTraits,
  updatePrimaryTrait,
  updateRarities,
  updateIsIncluded,
  updateStep,
  updateRarityNumber,
} = createflowSlice.actions;
export default createflowSlice.reducer;
