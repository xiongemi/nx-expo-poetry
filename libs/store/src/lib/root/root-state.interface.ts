import { RouterState } from 'connected-react-router';

import { BookmarksState } from '../bookmarks/bookmarks.slice';
import { PoemOfTheDayState } from '../poem-of-the-day/poem-of-the-day.slice';

export interface RootState {
  poemOfTheDay: PoemOfTheDayState;
  bookmarks: BookmarksState;
  router?: RouterState;
}
