import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import FolderType, { FileType, TokenType } from '../type/folder_type';

interface deployStates {
  orderBy: boolean;
  filter: string;
  tokenName: string;
  tokens: TokenType[];
  currentToken: TokenType | undefined;
  collectionName: string;
  collectionDescription: string;
  collectionSymbol: string;
  totalSupply: number;
  externalLink: string;
  collectionPhoto: string;
  payoutAddress: string;
  royalties: number;
  royaltiesPayoutAddress: string;
  step: number;
}

const initialState: deployStates = {
  orderBy: false,
  filter: '',
  tokenName: '',
  tokens: [],
  currentToken: undefined,
  collectionName: '',
  collectionDescription: '',
  collectionSymbol: '',
  totalSupply: 0,
  externalLink: '',
  collectionPhoto: '',
  payoutAddress: '',
  royalties: 0,
  royaltiesPayoutAddress: '',
  step: 0,
};

export const deploySlice = createSlice({
  name: 'deploy',
  initialState,
  reducers: {
    updateOrderBy: (state, action: PayloadAction<boolean>) => {
      state.orderBy = action.payload;
    },
    updateFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
    updateTokenName: (state, action: PayloadAction<string>) => {
      state.tokenName = action.payload;
    },
    updateTokens: (state, action: PayloadAction<TokenType[]>) => {
      state.tokens = action.payload;
    },
    updateCurrentToken: (
      state,
      action: PayloadAction<TokenType | undefined>
    ) => {
      state.currentToken = action.payload;
    },
    updateCollectionName: (state, action: PayloadAction<string>) => {
      state.collectionName = action.payload;
    },
    updateCollectionDescription: (state, action: PayloadAction<string>) => {
      state.collectionDescription = action.payload;
    },
    updateCollectionSymbol: (state, action: PayloadAction<string>) => {
      state.collectionSymbol = action.payload;
    },
    updateTotalSupply: (state, action: PayloadAction<any>) => {
      state.totalSupply = action.payload;
    },
    updateExternalLink: (state, action: PayloadAction<string>) => {
      state.externalLink = action.payload;
    },
    updateCollectionPhoto: (state, action: PayloadAction<string>) => {
      state.collectionPhoto = action.payload;
    },
    updatePayoutAddress: (state, action: PayloadAction<string>) => {
      state.payoutAddress = action.payload;
    },
    updateRoyalties: (state, action: PayloadAction<number>) => {
      state.royalties = action.payload;
    },
    updateRoyaltiesPayoutAddress: (state, action: PayloadAction<string>) => {
      state.royaltiesPayoutAddress = action.payload;
    },
    updateStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
  },
});

export const {
  updateOrderBy,
  updateFilter,
  updateTokenName,
  updateTokens,
  updateCurrentToken,
  updateCollectionName,
  updateCollectionDescription,
  updateCollectionSymbol,
  updateTotalSupply,
  updateExternalLink,
  updateCollectionPhoto,
  updatePayoutAddress,
  updateRoyalties,
  updateRoyaltiesPayoutAddress,
  updateStep,
} = deploySlice.actions;
export default deploySlice.reducer;
