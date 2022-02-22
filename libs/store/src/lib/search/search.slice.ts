import { LoadingStatus, Poem } from '@nx-expo-poetry/models';
import {
  mapPoemResponseToPoem,
  PoemResponse,
  poetryService,
} from '@nx-expo-poetry/services';
import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import { RootState } from '../root/root-state.interface';

export const SEARCH_FEATURE_KEY = 'search';

export interface SearchState {
  loadingStatus: LoadingStatus;
  poems: Poem[];
  error?: string;
}

export const fetchSearch = createAsyncThunk<
  Poem[],
  {
    searchQuery: string;
  }
>('search/fetchStatus', async ({ searchQuery }, { rejectWithValue }) => {
  try {
    console.log('searchQuery', searchQuery);
    const poemResponses: PoemResponse[] = await poetryService.searchPoems(
      searchQuery
    );

    return poemResponses.map(mapPoemResponseToPoem);
  } catch (error) {
    return rejectWithValue({ error });
  }
});

export const initialSearchState: SearchState = {
  poems: [],
  loadingStatus: 'not loaded',
  error: undefined,
};

export const searchSlice = createSlice({
  name: SEARCH_FEATURE_KEY,
  initialState: initialSearchState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearch.pending, (state: SearchState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchSearch.fulfilled,
        (state: SearchState, action: PayloadAction<Poem[]>) => {
          state.poems = action.payload;
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(fetchSearch.rejected, (state: SearchState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      });
  },
});

export const searchReducer = searchSlice.reducer;
export const searchActions = searchSlice.actions;

const getSearchState = (rootState: RootState): SearchState =>
  rootState[SEARCH_FEATURE_KEY];

const getPoems = createSelector(
  getSearchState,
  (searchState) => searchState.poems
);

const getLoadingStatus = createSelector(
  getSearchState,
  (searchState) => searchState.loadingStatus
);

export const searchSelectors = { getSearchState, getPoems, getLoadingStatus };
