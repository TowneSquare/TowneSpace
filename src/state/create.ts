import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import FilterType from "../type/filter_type";
import { NftType, NftMetadataType } from "../type/nft_type";
import { COLLECTIONS, NFTS } from './constants';

interface createStates {
   collectionName: string;
   totalMaxSupply: string;
};

const initialState: createStates = {
   collectionName: "",
   totalMaxSupply: "",
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
      }
   },
   extraReducers: (builder) => {

   },
});

export const {
   updateCollectionName,
   updateTotalMaxSupply,
} = createflowSlice.actions;
export default createflowSlice.reducer;


