import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import FilterType from "../type/filter_type";
import { NftType, NftMetadataType } from "../type/nft_type";
import { COLLECTIONS, NFTS } from './constants';

interface tokensStates {
   collections: NftMetadataType[],
   currentCollection: NftMetadataType | undefined,
   nfts: NftMetadataType[],
   currentNft: NftMetadataType | undefined;
   currentTrait: NftMetadataType | undefined,
   newTrait: NftMetadataType | undefined,
};

const initialState: tokensStates = {
   collections: [],
   currentCollection: undefined,
   nfts: [],
   currentNft: undefined,
   currentTrait: undefined,
   newTrait: undefined,
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
      chooseCollection: (state, action: PayloadAction<NftMetadataType>) => {
         state.currentCollection = action.payload;
      },
      chooseNft: (state, action: PayloadAction<NftMetadataType>) => {
         state.currentNft = action.payload;
      },
      chooseTrait: (state, action: PayloadAction<NftMetadataType>) => {
         state.currentTrait = action.payload;
      },
      chooseNewTrait: (state, action: PayloadAction<NftMetadataType>) => {
         state.newTrait = action.payload;
      }
   },
   extraReducers: (builder) => {
      builder.addCase(fetchCollections.fulfilled, (state, action) => {
         state.collections = action.payload;
         if(action.payload.length > 0){
            state.currentCollection = action.payload[0];
         }else {
            state.currentNft = undefined;
            state.nfts = [];
         }
      });
      builder.addCase(fetchNfts.fulfilled, (state, action) => {
         state.nfts = action.payload;
         if (action.payload.length > 0)
            state.currentNft = action.payload[0];
      });
   },
});

export const {
   chooseCollection,
   chooseNft,
   chooseTrait,
   chooseNewTrait
} = tokensSlice.actions;
export default tokensSlice.reducer;


