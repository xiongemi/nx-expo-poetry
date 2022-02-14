import { PoemOfTheDayState } from '../poem-of-the-day/poem-of-the-day.slice';

export interface RootState {
  poemOfTheDay: PoemOfTheDayState;
}
