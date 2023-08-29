import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import FilterType from "../type/filter_type";
import { NftType, NftMetadataType } from "../type/nft_type";
import { COLLECTIONS, NFTS } from './constants';

interface tokensStates {
   collections: NftMetadataType[],
   collectionIndex: number,
   nfts: NftMetadataType[],
   nftIndex: number;
   traitAddress: string | undefined,
};

const initialState: tokensStates = {
   collections: [],
   collectionIndex: 0,
   nfts: [],
   nftIndex: 0,
   traitAddress: undefined
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

export const fetchNfts = createAsyncThunk(
   'nft/fetch',
   async (name: string, thunkAPI) => {
      try {
         return NFTS.filter(nft => nft.collection == name);
      } catch (error: any) {
         return thunkAPI.rejectWithValue(error.response.data);
      }
   }
);

export const tokensSlice = createSlice({
   name: 'collections',
   initialState,
   reducers: {
      chooseCollection: (state, action: PayloadAction<number>) => {
         state.collectionIndex = action.payload;
         state.nftIndex = 0;
      },
      chooseNft: (state, action: PayloadAction<number>) => {
         state.nftIndex = action.payload;
      },
      chooseTrait: (state, action: PayloadAction<string>) => {
         state.traitAddress = action.payload;
      }
   },
   extraReducers: (builder) => {
      builder.addCase(fetchCollections.fulfilled, (state, action) => {
         state.collections = action.payload;
         if (action.payload.length > 0) {
            state.nftIndex = 0;
         } else {
            state.nftIndex = -1;
            state.nfts = [];
         }
      });
      builder.addCase(fetchNfts.fulfilled, (state, action) => {
         state.nfts = action.payload;
      });
   },
});

export const {
   chooseCollection,
   chooseNft,
   chooseTrait
} = tokensSlice.actions;
export default tokensSlice.reducer;


