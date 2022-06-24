import { combineReducers } from '@reduxjs/toolkit';

import { bookmarksReducer } from '../bookmarks/bookmarks.slice';
import { poemOfTheDayReducer } from '../poem-of-the-day/poem-of-the-day.slice';
import { searchReducer } from '../search/search.slice';

import { RootState } from './root-state.interface';

export const createRootReducer = combineReducers<RootState>({
  poemOfTheDay: poemOfTheDayReducer,
  bookmarks: bookmarksReducer,
  search: searchReducer,
});
