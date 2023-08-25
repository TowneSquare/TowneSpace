import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import FilterType from "../type/filter_type";
import { NftType, NftMetadataType } from "../type/nft_type";
import { COLLECTIONS } from './constants';

interface CollectionStates {
   collections: NftMetadataType[]
};

const initialState: CollectionStates = {
   collections: []
}

export const fetchCollections = createAsyncThunk(
   'collection/fetch',
   async (arg, thunkAPI) => {
      try {
         return COLLECTIONS;
       } catch (error: any) {
         return thunkAPI.rejectWithValue(error.response.data);
       }
   }
);

export const collectionsSlice = createSlice({
   name: 'collections',
   initialState,
   reducers: {

   },
   extraReducers: (builder) => {
      builder.addCase(fetchCollections.fulfilled, (state, action) => {
         state.collections = action.payload;
      });
   },
});

export const {
} = collectionsSlice.actions;
export default collectionsSlice.reducer;


