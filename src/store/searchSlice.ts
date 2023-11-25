import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { ELEMENTS_PER_PAGE } from '@/constants';
import { RootState } from '@/store/store';
import { api } from '@/services/star-wars';

export interface ISearchState {
  searchTerm: string;
  itemPerPage: number;
  isLoadingData: boolean;
  isLoadingDetailedData: boolean;
}

const initialState: ISearchState = {
  searchTerm: '',
  itemPerPage: ELEMENTS_PER_PAGE.sm,
  isLoadingData: false,
  isLoadingDetailedData: false,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemPerPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase<typeof HYDRATE, PayloadAction<RootState, typeof HYDRATE>>(
      HYDRATE,
      (state, { payload }) => ({ ...state, ...payload.search })
    );
    builder.addMatcher(api.endpoints.getData.matchPending, (state) => {
      state.isLoadingData = true;
    });
    builder.addMatcher(api.endpoints.getData.matchFulfilled, (state) => {
      state.isLoadingData = false;
    });
    builder.addMatcher(api.endpoints.getData.matchRejected, (state) => {
      state.isLoadingData = false;
    });
    builder.addMatcher(api.endpoints.getDataById.matchPending, (state) => {
      state.isLoadingDetailedData = true;
    });
    builder.addMatcher(api.endpoints.getDataById.matchFulfilled, (state) => {
      state.isLoadingDetailedData = false;
    });
    builder.addMatcher(api.endpoints.getDataById.matchRejected, (state) => {
      state.isLoadingDetailedData = false;
    });
  },
});

export const { setSearchTerm, setItemsPerPage } = searchSlice.actions;

export const selectSearchTerm = (state: RootState) => state.search.searchTerm;
export const selectItemPerPage = (state: RootState) => state.search.itemPerPage;

export default searchSlice.reducer;
