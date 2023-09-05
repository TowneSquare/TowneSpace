import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FileType, TokenType } from '../type/folder_type';

interface deployStates {
   orderBy: boolean;
   collectionCount: number;
   filter: string;
   tokenName: string;
   tokens: FileType[][];
   currentToken: TokenType | undefined;
};

const initialState: deployStates = {
   orderBy: false,
   collectionCount: 0,
   filter: "",
   tokenName: "",
   tokens: [],
   currentToken: undefined
}

export const deploySlice = createSlice({
   name: 'deploy',
   initialState,
   reducers: {
      updateOrderBy: (state, action: PayloadAction<boolean>) => {
         state.orderBy = action.payload;
      },
      updateCollectionCount: (state, action: PayloadAction<number>) => {
         state.collectionCount = action.payload;
      },
      updateFilter: (state, action: PayloadAction<string>) => {
         state.filter = action.payload;
      },
      updateTokenName: (state, action: PayloadAction<string>) => {
         state.tokenName = action.payload;
      },
      updateTokens: (state, action: PayloadAction<FileType[][]>) => {
         state.tokens = action.payload;
      },
      updateCurrentToken: (state, action: PayloadAction<TokenType>) => {
         state.currentToken = action.payload;
      }
   }
});

export const {
   updateOrderBy,
   updateCollectionCount,
   updateFilter,
   updateTokenName,
   updateTokens,
   updateCurrentToken
} = deploySlice.actions;
export default deploySlice.reducer;


