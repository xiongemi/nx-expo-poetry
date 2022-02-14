import { Poem } from '@nx-expo-poetry/models';
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

export const POEM_OF_THE_DAY_FEATURE_KEY = 'poemOfTheDay';

export interface PoemOfTheDayState {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  poem?: Poem;
  error?: string;
}

export const fetchPoemOfTheDay = createAsyncThunk<Poem, void>(
  'poemOfTheDay/fetchStatus',
  async (_, { rejectWithValue }) => {
    try {
      const poemResponses: PoemResponse[] =
        await poetryService.getPoemOfTheDay();
      return mapPoemResponseToPoem(poemResponses[0]);
    } catch (error) {
      return rejectWithValue({ error });
    }
  }
);

export const initialPoemOfTheDayState: PoemOfTheDayState = {
  loadingStatus: 'not loaded',
  poem: undefined,
  error: undefined,
};

export const poemOfTheDaySlice = createSlice({
  name: POEM_OF_THE_DAY_FEATURE_KEY,
  initialState: initialPoemOfTheDayState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPoemOfTheDay.pending, (state: PoemOfTheDayState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchPoemOfTheDay.fulfilled,
        (state: PoemOfTheDayState, action: PayloadAction<Poem>) => {
          state.poem = action.payload;
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(
        fetchPoemOfTheDay.rejected,
        (state: PoemOfTheDayState, action) => {
          state.loadingStatus = 'error';
          state.error = action.error.message;
        }
      );
  },
});

/*
 * Export reducer for store configuration.
 */
export const poemOfTheDayReducer = poemOfTheDaySlice.reducer;

export const poemOfTheDayActions = poemOfTheDaySlice.actions;

const getPoemOfTheDayState = (rootState: RootState): PoemOfTheDayState =>
  rootState[POEM_OF_THE_DAY_FEATURE_KEY];

const getPoemOfTheDay = createSelector(
  getPoemOfTheDayState,
  (state: PoemOfTheDayState) => state.poem
);

export const poemOfTheDaySelelctors = { getPoemOfTheDayState, getPoemOfTheDay };
