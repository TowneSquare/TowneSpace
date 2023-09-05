import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface deployStates {
   orderBy: boolean;
   collectionCount: number;
   filter: string;
   tokenName: string;
};

const initialState: deployStates = {
   orderBy: false,
   collectionCount: 0,
   filter: "",
   tokenName: ""
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
      }
   }
});

export const {
   updateOrderBy,
   updateCollectionCount,
   updateFilter,
   updateTokenName
} = deploySlice.actions;
export default deploySlice.reducer;


