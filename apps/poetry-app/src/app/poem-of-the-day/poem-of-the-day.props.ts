import { Poem } from '@nx-expo-poetry/models';
import {
  RootState,
  poemOfTheDaySelectors,
  fetchPoemOfTheDay,
  bookmarksActions,
} from '@nx-expo-poetry/store';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

const mapStateToProps = (state: RootState) => {
  return {
    poem: poemOfTheDaySelectors.getPoemOfTheDay(state),
    loadingStatus: poemOfTheDaySelectors.getPoemOfTheDayLoadingStatus(state),
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, void, AnyAction>
) => {
  return {
    fetchPoemOfTheDay() {
      dispatch(fetchPoemOfTheDay());
    },
    bookmark(formattedDate: string, poem: Poem) {
      dispatch(
        bookmarksActions.add({
          formattedDate,
          id: encodeURIComponent(poem.title),
          poem: {
            ...poem,
            lines: poem.lines.slice(0, 1),
          },
        })
      );
    },
  };
};

type mapStateToPropsType = ReturnType<typeof mapStateToProps>;
type mapDispatchToPropsType = ReturnType<typeof mapDispatchToProps>;

type PoemOfTheDayProps = mapStateToPropsType & mapDispatchToPropsType;

export { mapStateToProps, mapDispatchToProps };
export type { PoemOfTheDayProps };
