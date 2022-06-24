import { BookmarksState } from '../bookmarks/bookmarks.slice';
import { PoemOfTheDayState } from '../poem-of-the-day/poem-of-the-day.slice';
import { SearchState } from '../search/search.slice';

export interface RootState {
  poemOfTheDay: PoemOfTheDayState;
  bookmarks: BookmarksState;
  search: SearchState;
}
