import {
  RootState,
  poemOfTheDaySelelctors,
  fetchPoemOfTheDay,
} from '@nx-expo-poetry/store';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

const mapStateToProps = (state: RootState) => {
  return {
    poem: poemOfTheDaySelelctors.getPoemOfTheDay(state),
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, void, AnyAction>
) => {
  return {
    fetchPoemOfTheDay() {
      dispatch(fetchPoemOfTheDay());
    },
  };
};

type mapStateToPropsType = ReturnType<typeof mapStateToProps>;
type mapDispatchToPropsType = ReturnType<typeof mapDispatchToProps>;

type PoemOfTheDayProps = mapStateToPropsType & mapDispatchToPropsType;

export { mapStateToProps, mapDispatchToProps };
export type { PoemOfTheDayProps };
