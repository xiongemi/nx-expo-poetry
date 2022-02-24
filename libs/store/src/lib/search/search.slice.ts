import { LoadingStatus, Poem } from '@nx-expo-poetry/models';
import {
  mapPoemResponseToPoem,
  PoemResponse,
  poetryService,
} from '@nx-expo-poetry/services';
import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';

import { RootState } from '../root/root-state.interface';

export const SEARCH_FEATURE_KEY = 'search';

export interface SearchEntity {
  id: string;
  poem: Poem;
}

export interface SearchState extends EntityState<SearchEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
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

export const searchAdapter = createEntityAdapter<SearchEntity>();

export const initialSearchState: SearchState = searchAdapter.getInitialState({
  loadingStatus: 'not loaded',
  error: undefined,
});

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
          searchAdapter.setAll(
            state,
            action.payload.map((poem) => ({
              id: encodeURIComponent(poem.title),
              poem,
            }))
          );
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

const { selectAll, selectEntities, selectById } = searchAdapter.getSelectors();

const getSearchState = (rootState: RootState): SearchState =>
  rootState[SEARCH_FEATURE_KEY];

export const selectAllSearchResults = createSelector(getSearchState, selectAll);

export const selectSearchEntities = createSelector(
  getSearchState,
  selectEntities
);

export const selectSearchResultById = (id: string) =>
  createSelector(
    getSearchState,
    (searchState: SearchState): SearchEntity | undefined => {
      return selectById(searchState, id);
    }
  );

const getLoadingStatus = createSelector(
  getSearchState,
  (searchState): LoadingStatus => searchState.loadingStatus
);

export const searchSelectors = {
  getSearchState,
  selectAllSearchResults,
  selectSearchEntities,
  selectSearchResultById,
  getLoadingStatus,
};
