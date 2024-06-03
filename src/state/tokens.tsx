import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { NftMetadataType } from '../type/nft_type';
import { APTOS, COLLECTIONS, NFTS } from './constants';
import FilterType from '../type/filter_type';
import { CollectionV1Fields, CollectionV2Fields, Queries } from '../api';
import { RootState } from './store';
import CustomFolderType from '../type/custom_folder_type';

interface tokensStates {
  filter: FilterType;
  collections: CollectionV1Fields[] | CollectionV2Fields[];
  currentCollection: CollectionV1Fields | CollectionV2Fields | undefined;
  nfts: NftMetadataType[];
  currentNft: NftMetadataType | undefined;
  folders: string[];
  currentTraitFolders: CustomFolderType[];
  currentTraitFolder: CustomFolderType | undefined;
  isFetching: boolean;

  currentTrait: NftMetadataType | undefined;
  newTrait: NftMetadataType | undefined;
}

const initialState: tokensStates = {
  filter: FilterType.composable,
  collections: [],
  currentCollection: undefined,
  nfts: [],
  currentNft: undefined,
  folders: [],
  currentTraitFolders: [],
  currentTraitFolder: undefined,
  isFetching: false,

  currentTrait: undefined,
  newTrait: undefined,
};

export const fetchCollections = createAsyncThunk(
  'collection/fetch',
  async (address: string, thunkAPI) => {
    try {
      const queries = new Queries(APTOS);

      // const filter = (thunkAPI.getState() as RootState).tokensState.filter;
      // if (filter == FilterType.composable) {
      const res = await queries.getOwnedV2Collections(0, 100, address);
      return res;
      // } else {
      //   const res = await queries.getOwnedV1Collections(0, 100, address);
      //   return res;
      // }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchNfts = createAsyncThunk(
  'nft/fetch',
  async (args: { address: string; collection_id: string }, thunkAPI) => {
    try {
      const queries = new Queries(APTOS);

      // const filter = (thunkAPI.getState() as RootState).tokensState.filter;
      // if (filter == FilterType.composable) {
      thunkAPI.dispatch(setFetchState(true));
      const res = await queries.getOwnedV2Tokens(
        0,
        100,
        args.address,
        args.collection_id
      );

      thunkAPI.dispatch(setFetchState(false));
      return res;
      // } else {
      // const res = await queries.getOwnedV1Tokens(
      //   0,
      //   100,
      //   args.address,
      //   args.collection_id
      // );
      // return res;
      // }
    } catch (error: any) {
      thunkAPI.dispatch(setFetchState(false));
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const tokensSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<FilterType>) => {
      state.filter = action.payload;
    },
    chooseCollection: (
      state,
      action: PayloadAction<CollectionV1Fields | CollectionV2Fields>
    ) => {
      state.currentCollection = action.payload;
    },
    chooseNft: (state, action: PayloadAction<NftMetadataType>) => {
      state.currentNft = action.payload;
    },
    setFolders: (state, action: PayloadAction<string[]>) => {
      state.folders = action.payload;
    },
    setCurrentTraitFolders: (state, action: PayloadAction<CustomFolderType[]>) => {
      state.currentTraitFolders = action.payload;
    },
    chooseCurrentTraitFolder: (state, action: PayloadAction<CustomFolderType | undefined>) => {
      state.currentTraitFolder = action.payload;
    },
    setFetchState: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload;
    },

    chooseTrait: (state, action: PayloadAction<NftMetadataType>) => {
      state.currentTrait = action.payload;
    },
    chooseNewTrait: (state, action: PayloadAction<NftMetadataType>) => {
      state.newTrait = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCollections.fulfilled, (state, action) => {
      state.collections = action.payload;
      if (action.payload.length > 0) {
        state.currentCollection = action.payload[0];
      } else {
        state.currentNft = undefined;
        state.nfts = [];
      }
    });
    builder.addCase(fetchNfts.fulfilled, (state, action) => {
      state.nfts = action.payload;
      if (action.payload.length > 0) state.currentNft = action.payload[0];

      const folders = action.payload
        .filter((nft) => nft.type != 'composable')
        .reduce((acc: string[], nft: NftMetadataType) => {
          const { description } = nft;

          if (description && acc.indexOf(description) == -1) {
            acc.push(description);
          }

          return acc;
        }, []);

      state.folders = folders;
    });
  },
});

export const {
  setFilter,
  chooseCollection,
  chooseNft,
  setFolders,
  setCurrentTraitFolders,
  chooseCurrentTraitFolder,
  setFetchState,

  chooseTrait,
  chooseNewTrait,
} = tokensSlice.actions;
export default tokensSlice.reducer;
