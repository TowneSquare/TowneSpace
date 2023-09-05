import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import FolderType from '../type/folder_type';

interface createStates {
   collectionName: string;
   totalMaxSupply: string;
   traits: FolderType[];
   primaryTrait: FolderType | undefined;
};

const initialState: createStates = {
   collectionName: "",
   totalMaxSupply: "",
   traits: [],
   primaryTrait: undefined
}

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
      }
   }
});

export const {
   updateCollectionName,
   updateTotalMaxSupply,
   updateTraits,
   updatePrimaryTrait
} = createflowSlice.actions;
export default createflowSlice.reducer;


