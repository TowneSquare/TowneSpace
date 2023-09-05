import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import FolderType from '../type/folder_type';

interface createStates {
   collectionName: string;
   totalMaxSupply: string;
   traits: FolderType[];
};

const initialState: createStates = {
   collectionName: "",
   totalMaxSupply: "",
   traits: []
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
      }
   }
});

export const {
   updateCollectionName,
   updateTotalMaxSupply,
   updateTraits
} = createflowSlice.actions;
export default createflowSlice.reducer;


