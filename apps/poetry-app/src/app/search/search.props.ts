import {
  RootState,
  searchSelectors,
  fetchSearch,
} from '@nx-expo-poetry/store';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

const mapStateToProps = (state: RootState) => {
  return {
    poems: searchSelectors.getPoems(state),
    loadingStatus: searchSelectors.getLoadingStatus(state),
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, void, AnyAction>
) => {
  return {
    fetchSearch(searchQuery: string) {
      dispatch(fetchSearch({ searchQuery }));
    },
  };
};

type mapStateToPropsType = ReturnType<typeof mapStateToProps>;
type mapDispatchToPropsType = ReturnType<typeof mapDispatchToProps>;

type SearchProps = mapStateToPropsType & mapDispatchToPropsType;

export { mapStateToProps, mapDispatchToProps };
export type { SearchProps };
