import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { NftMetadataType } from '../type/nft_type';
import { APTOS, COLLECTIONS, NFTS } from './constants';
import FilterType from '../type/filter_type';
import {
  CollectionV1Fields,
  CollectionV2Fields,
  Queries,
  TokenFields,
} from '../api';
import { RootState } from './store';
import CustomFolderType from '../type/custom_folder_type';

interface tokensStates {
  nftFilter: FilterType;
  collections: CollectionV1Fields[] | CollectionV2Fields[];
  currentCollection: CollectionV1Fields | CollectionV2Fields | undefined;
  allNfts: NftMetadataType[];
  nfts: NftMetadataType[];
  currentNft: NftMetadataType | undefined;
  folders: string[];
  currentTraitFolders: CustomFolderType[];
  currentTraitFolder: CustomFolderType | undefined;
  isFetching: boolean;
  triggeredTime: number;

  collectionFilter: FilterType;
  myCollections: CollectionV1Fields[] | CollectionV2Fields[];
}

const initialState: tokensStates = {
  nftFilter: FilterType.composable,
  collections: [],
  currentCollection: undefined,
  allNfts: [],
  nfts: [],
  currentNft: undefined,
  folders: [],
  currentTraitFolders: [],
  currentTraitFolder: undefined,
  isFetching: false,
  triggeredTime: 0,

  collectionFilter: FilterType.composable,
  myCollections: [],
};

export const fetchMyCollections = createAsyncThunk(
  'myCollection/fetch',
  async (address: string, thunkAPI) => {
    try {
      const queries = new Queries(APTOS);
      const filter = (thunkAPI.getState() as RootState).tokensState
        .collectionFilter;
      if (filter == FilterType.composable) {
        const res = await queries.getOwnedV2Collections(0, 9999999, address);
        return res;
      } else {
        const res = await queries.getOwnedV1Collections(0, 9999999, address);
        return res;
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchCollections = createAsyncThunk(
  'collection/fetch',
  async (address: string, thunkAPI) => {
    try {
      const queries = new Queries(APTOS);
      const filter = (thunkAPI.getState() as RootState).tokensState.nftFilter;
      if (filter == FilterType.composable) {
        const res = await queries.getOwnedV2Collections(0, 9999999, address);
        return res;
      } else {
        const res = await queries.getOwnedV1Collections(0, 9999999, address);
        return res;
      }
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
      const filter = (thunkAPI.getState() as RootState).tokensState.nftFilter;
      const triggeredTime = Date.now();

      thunkAPI.dispatch(setFetchState(true));
      thunkAPI.dispatch(setTriggeredTime(triggeredTime));

      let res: { allNfts: Array<TokenFields>; ownedNfts: Array<TokenFields> };

      if (filter == FilterType.composable) {
        res = await queries.getOwnedV2Tokens(
          0,
          9999999,
          args.address,
          args.collection_id
        );
      } else {
        res = await queries.getOwnedV1Tokens(
          0,
          9999999,
          args.address,
          args.collection_id
        );
      }

      res.ownedNfts.sort((a, b) => {
        if (a.type === undefined) return 1;
        if (b.type === undefined) return -1;
        if (a.type < b.type) return -1;
        if (a.type > b.type) return 1;

        if (a.description === undefined) return 1;
        if (b.description === undefined) return -1;
        if (a.description < b.description) return -1;
        if (a.description > b.description) return 1;
        return 0;
      });

      const latestTriggerTime = (thunkAPI.getState() as RootState).tokensState
        .triggeredTime;
      if (triggeredTime < latestTriggerTime) {
        console.log("rejected", args.collection_id)
        return thunkAPI.rejectWithValue('rejected');
      }
      thunkAPI.dispatch(setFetchState(false));
      return res;
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
    setNftFilter: (state, action: PayloadAction<FilterType>) => {
      state.nftFilter = action.payload;
    },
    emptyCollections: (state) => {
      state.collections = [];
      state.nfts = [];
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
    setCurrentTraitFolders: (
      state,
      action: PayloadAction<CustomFolderType[]>
    ) => {
      state.currentTraitFolders = action.payload;
    },
    chooseCurrentTraitFolder: (
      state,
      action: PayloadAction<CustomFolderType | undefined>
    ) => {
      state.currentTraitFolder = action.payload;
    },
    setFetchState: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload;
    },
    setTriggeredTime: (state, action: PayloadAction<number>) => {
      state.triggeredTime = action.payload;
    },

    setCollectionFilter: (state, action: PayloadAction<FilterType>) => {
      state.collectionFilter = action.payload;
    },
    emptyMyCollections: (state) => {
      state.myCollections = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCollections.fulfilled, (state, action) => {
      state.collections = action.payload;
      if (action.payload.length > 0 && !state.currentCollection) {
        state.currentCollection = action.payload[0];
      } else {
        state.currentNft = undefined;
        state.nfts = [];
      }
    });
    builder.addCase(fetchNfts.fulfilled, (state, action) => {
      state.allNfts = action.payload.allNfts;
      state.nfts = action.payload.ownedNfts;
      if (state.nfts.length > 0) state.currentNft = state.nfts[0];

      const folders = state.nfts
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
    builder.addCase(fetchMyCollections.fulfilled, (state, action) => {
      state.myCollections = action.payload;
    });
  },
});

export const {
  setNftFilter,
  emptyCollections,
  chooseCollection,
  chooseNft,
  setFolders,
  setCurrentTraitFolders,
  chooseCurrentTraitFolder,
  setFetchState,
  setTriggeredTime,

  setCollectionFilter,
  emptyMyCollections,
} = tokensSlice.actions;
export default tokensSlice.reducer;
