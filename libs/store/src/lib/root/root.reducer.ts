import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import { bookmarksReducer } from '../bookmarks/bookmarks.slice';
import { poemOfTheDayReducer } from '../poem-of-the-day/poem-of-the-day.slice';
import { searchReducer } from '../search/search.slice';

import { RootState } from './root-state.interface';

export const createRootReducer = (history: History) =>
  combineReducers<RootState>({
    router: connectRouter(history) as any,
    poemOfTheDay: poemOfTheDayReducer,
    bookmarks: bookmarksReducer,
    search: searchReducer
  });
