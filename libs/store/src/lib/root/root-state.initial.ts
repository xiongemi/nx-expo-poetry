import { initialPoemOfTheDayState } from '../poem-of-the-day/poem-of-the-day.slice';
import { RootState } from './root-state.interface';

export const initialRootState: RootState = {
  poemOfTheDay: initialPoemOfTheDayState,
};
