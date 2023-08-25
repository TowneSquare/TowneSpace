import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import FilterType from "../type/filter_type";
import { NftType, NftMetadataType } from "../type/nft_type";
import { NFTS } from './constants';

interface NftStates {
   nfts: NftMetadataType[]
};

const initialState: NftStates = {
   nfts: []
}

export const fetchNfts = createAsyncThunk(
   'nft/fetch',
   async (arg, thunkAPI) => {
      try {
         return NFTS;
       } catch (error: any) {
         return thunkAPI.rejectWithValue(error.response.data);
       }
   }
);

export const NftSlice = createSlice({
   name: 'nfts',
   initialState,
   reducers: {

   },
   extraReducers: (builder) => {
      builder.addCase(fetchNfts.fulfilled, (state, action) => {
         state.nfts = action.payload;
      });
   },
});

export const {
} = NftSlice.actions;
export default NftSlice.reducer;

