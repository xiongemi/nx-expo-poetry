import { Poem } from '@nx-expo-poetry/models';
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

export const BOOKMARKS_FEATURE_KEY = 'bookmarks';

export interface BookmarksEntity {
  id: string;
  formattedDate: string;
  poem: Poem;
}

export interface BookmarksState extends EntityState<BookmarksEntity> {
  poem?: Poem;
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error?: string;
}

export const fetchBookmark = createAsyncThunk<
  Poem,
  { title: string; author: string }
>('bookmarks/fetchStatus', async ({ title, author }, { rejectWithValue }) => {
  try {
    const poemResponses: PoemResponse[] = await poetryService.getPoemsWithTitle(
      title,
      true
    );
    if (!poemResponses.length) {
      return rejectWithValue({ error: 'not found' });
    }
    if (poemResponses.length > 1) {
      const poemResponse = poemResponses.find(
        (poemResponse) => poemResponse.author === author
      );
      if (!poemResponse) {
        return rejectWithValue({ error: 'not found' });
      }
      return mapPoemResponseToPoem(poemResponse);
    }
    return mapPoemResponseToPoem(poemResponses[0]);
  } catch (error) {
    return rejectWithValue({ error });
  }
});

export const bookmarksAdapter = createEntityAdapter<BookmarksEntity>();

export const initialBookmarksState: BookmarksState =
  bookmarksAdapter.getInitialState({
    loadingStatus: 'not loaded',
    error: undefined,
  });

export const bookmarksSlice = createSlice({
  name: BOOKMARKS_FEATURE_KEY,
  initialState: initialBookmarksState,
  reducers: {
    add: bookmarksAdapter.addOne,
    remove: bookmarksAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookmark.pending, (state: BookmarksState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchBookmark.fulfilled,
        (state: BookmarksState, action: PayloadAction<Poem>) => {
          state.poem = action.payload;
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(fetchBookmark.rejected, (state: BookmarksState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      });
  },
});

/*
 * Export reducer for store configuration.
 */
export const bookmarksReducer = bookmarksSlice.reducer;

export const bookmarksActions = bookmarksSlice.actions;

const { selectAll, selectEntities } = bookmarksAdapter.getSelectors();

const getBookmarksState = (rootState: RootState): BookmarksState =>
  rootState[BOOKMARKS_FEATURE_KEY];

const selectAllBookmarks = createSelector(getBookmarksState, selectAll);

const selectBookmarksEntities = createSelector(
  getBookmarksState,
  selectEntities
);

const getBookmarkPoem = createSelector(
  getBookmarksState,
  (bookmarksState: BookmarksState) => bookmarksState.poem
);

export const bookmarksSelectors = {
  selectAllBookmarks,
  selectBookmarksEntities,
  getBookmarkPoem,
};
