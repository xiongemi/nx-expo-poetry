import { combineReducers } from '@reduxjs/toolkit';

import { poemOfTheDayReducer } from '../poem-of-the-day/poem-of-the-day.slice';

import { RootState } from './root-state.interface';

export const rootReducer = combineReducers<RootState>({
  poemOfTheDay: poemOfTheDayReducer,
});
