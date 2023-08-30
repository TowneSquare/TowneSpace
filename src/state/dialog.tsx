import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import FilterType from "../type/filter_type";
import { NftType, NftMetadataType } from "../type/nft_type";
import { COLLECTIONS, NFTS } from './constants';

interface dialogStates {
   bTraitPanel: boolean;
   bRemovePanel: boolean;
};

const initialState: dialogStates = {
   bTraitPanel: false,
   bRemovePanel: false,
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
      }
   },
   extraReducers: (builder) => {

   },
});

export const {
   toggleTraitPanel,
   toggleRemovePanel,
} = dialogSlice.actions;
export default dialogSlice.reducer;


