import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ELEMENTS_PER_PAGE, SEARCH_TERM_KEY } from '@/app/const';
import { RootState } from '@/app/store';
import { getFromLocalStorage } from '@/utils/storageUtils';

export interface ISearchState {
  searchTerm: string;
  itemPerPage: number;
  isShowDetails: boolean;
}

const initialState: ISearchState = {
  searchTerm: getFromLocalStorage(SEARCH_TERM_KEY) ?? '',
  itemPerPage: ELEMENTS_PER_PAGE.sm,
  isShowDetails: false,
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
    setIsShowDetails: (state, action: PayloadAction<boolean>) => {
      state.isShowDetails = action.payload;
    },
  },
});

export const { setSearchTerm, setItemsPerPage, setIsShowDetails } =
  searchSlice.actions;

export const selectSearchTerm = (state: RootState) => state.search.searchTerm;
export const selectItemPerPage = (state: RootState) => state.search.itemPerPage;
export const selectisShowDetails = (state: RootState) =>
  state.search.isShowDetails;

export default searchSlice.reducer;
